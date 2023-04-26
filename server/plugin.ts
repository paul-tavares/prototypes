import {
  PluginInitializerContext,
  CoreSetup,
  CoreStart,
  Plugin,
  Logger,
  CustomRequestHandlerContext,
  LoggerFactory,
} from '@kbn/core/server';

import {
  PrototypesApiRouteHandlerContext,
  PrototypesPluginSetup,
  PrototypesPluginStart,
} from './types';
import { defineRoutes } from './routes';
import { PLUGIN_ID } from '../common';
import { runtime } from './service/runtime';

export class PrototypesPlugin implements Plugin<PrototypesPluginSetup, PrototypesPluginStart> {
  private readonly logger: Logger;
  private readonly loggerFactory: LoggerFactory;

  constructor(initializerContext: PluginInitializerContext) {
    this.loggerFactory = initializerContext.logger;
    this.logger = initializerContext.logger.get();
  }

  public setup(core: CoreSetup) {
    this.logger.debug('prototypes: Setup');

    runtime.start({
      logFactory: this.loggerFactory,
    });

    type PrototypesRouteHandlerContext = CustomRequestHandlerContext<{
      prototypes: PrototypesApiRouteHandlerContext;
    }>;

    const router = core.http.createRouter<PrototypesRouteHandlerContext>();

    // FIXME:PT why is this not working? Does not seem to be invoked when an API route handle is invoked.
    core.http.registerRouteHandlerContext<PrototypesRouteHandlerContext, typeof PLUGIN_ID>(
      PLUGIN_ID,
      async (context): Promise<PrototypesApiRouteHandlerContext> => {
        return {
          core: context.core,
          logger: Promise.resolve(this.loggerFactory),
        };
      }
    );

    // Register server side APIs
    defineRoutes(router);

    return {};
  }

  public start(core: CoreStart) {
    this.logger.debug('prototypes: Started');
    return {};
  }

  public stop() {}
}
