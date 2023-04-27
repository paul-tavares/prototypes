import { IRouter } from '@kbn/core/server';
import { registerFileUploadRoute } from './handlers/file_upload';

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

  registerFileUploadRoute(router);
}
