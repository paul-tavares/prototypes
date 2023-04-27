import { schema, TypeOf } from '@kbn/config-schema';
import { RequestHandler } from '@kbn/core-http-server';
import { createEsFileClient, createFileHashTransform } from '@kbn/files-plugin/server';
import { Readable } from 'stream';
import { v4 as uuidV4 } from 'uuid';
import { IRouter } from '@kbn/core/server';
import { runtime } from '../../service/runtime';
import { PrototypesApiRouteHandlerContext } from '../../types';

const DEFAULT_FILE_META_INDEX = `.fleet-files-endpoint`;
const DEFAULT_FILE_DATA_INDEX = `.fleet-file-data-endpoint`;
const MAX_FILE_SIZE_BYTES = 26214400; // 25MB payload limit

export const FileUploadRequestSchema = {
  body: schema.object({
    file: schema.stream(),
    indexPrefix: schema.maybe(schema.string({ minLength: 1 })),
  }),
};

export const registerFileUploadRoute = (router: IRouter) => {
  router.post(
    {
      path: '/api/prototypes/file_upload',
      validate: FileUploadRequestSchema,
      options: {
        body: {
          output: 'stream',
          maxBytes: MAX_FILE_SIZE_BYTES,
          accepts: ['multipart/form-data'],
        },
      },
    },
    getFileUploadHandler()
  );
};

const getFileUploadHandler = (): RequestHandler<
  never,
  never,
  TypeOf<typeof FileUploadRequestSchema.body>,
  PrototypesApiRouteHandlerContext
> => {
  return async (context, req, res) => {
    const esClient = (await context.core).elasticsearch.client.asCurrentUser;
    const logger = runtime.get('logFactory').get('file_upload');
    const fileStream = req.body.file;
    const indexPrefix = req.body.indexPrefix ?? '';

    const metaIndex = indexPrefix ? `${indexPrefix}-meta` : DEFAULT_FILE_META_INDEX;
    const dataIndex = indexPrefix ? `${indexPrefix}-data` : DEFAULT_FILE_DATA_INDEX;

    const fileClient = createEsFileClient({
      metadataIndex: metaIndex,
      blobStorageIndex: dataIndex,
      elasticsearchClient: esClient,
      logger: logger.get('file_upload'),
      indexIsAlias: true,
      maxSizeBytes: MAX_FILE_SIZE_BYTES,
    });

    const storedFile = await fileClient.create({
      id: uuidV4(),
      metadata: {
        name: fileStream?.hapi?.filename ?? 'some-file',
        mime: fileStream?.hapi?.headers['content-type'] ?? 'application/something',
      },
    });

    const newFile = await storedFile.uploadContent(fileStream as Readable, undefined, {
      transforms: [createFileHashTransform()],
    });

    return res.ok({
      body: {
        message: `File uploaded successfully`,
        index: {
          file_meta: metaIndex,
          file_data: dataIndex,
        },
        data: (await fileClient.get({ id: newFile.id })).toJSON(),
      },
    });
  };
};
