import { IRouter } from '@kbn/core/server';
import { FileUploadRequestSchema, getFileUploadHandler } from './handlers/file_upload';

export function defineRoutes(router: IRouter) {
  router.get(
    {
      path: '/api/prototypes/example',
      validate: false,
    },
    async (context, request, response) => {
      return response.ok({
        body: {
          time: new Date().toISOString(),
        },
      });
    }
  );

  router.post(
    {
      path: '/api/prototypes/file_upload',
      validate: FileUploadRequestSchema,
      options: {
        body: {
          output: 'stream',
          maxBytes: 26214400, // 25MB payload limit
          accepts: ['multipart/form-data'],
        },
      },
    },
    getFileUploadHandler()
  );
}
