import { schema, TypeOf } from '@kbn/config-schema';
import { RequestHandler } from '@kbn/core-http-server';
import { createEsFileClient } from '@kbn/files-plugin/server';
import { runtime } from '../../service/runtime';
import { PrototypesApiRouteHandlerContext } from '../../types';

export const FileUploadRequestSchema = {
  body: schema.object({
    file: schema.stream(),
  }),
};

export const getFileUploadHandler = (): RequestHandler<
  never,
  never,
  TypeOf<typeof FileUploadRequestSchema.body>,
  PrototypesApiRouteHandlerContext
> => {
  return async (context, req, res) => {
    const esClient = (await context.core).elasticsearch.client.asInternalUser;
    const logger = runtime.get('logFactory').get('file_upload');
    const file = req.body.file;

    const fileClient = createEsFileClient({
      metadataIndex: `.fleet-files-endpoint`,
      blobStorageIndex: `.fleet-file-data-endpoint`,
      elasticsearchClient: esClient,
      logger: logger.get('file_upload'),
      indexIsAlias: true,
    });

    return res.ok({
      body: {
        message: `File uploaded successfully.`,
      },
    });
  };
};
