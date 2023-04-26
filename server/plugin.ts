import {
  PluginInitializerContext,
  CoreSetup,
  CoreStart,
  Plugin,
  Logger,
} from '../../../src/core/server';

import { PrototypesPluginSetup, PrototypesPluginStart } from './types';
import { defineRoutes } from './routes';

export class PrototypesPlugin implements Plugin<PrototypesPluginSetup, PrototypesPluginStart> {
  private readonly logger: Logger;

  constructor(initializerContext: PluginInitializerContext) {
    this.logger = initializerContext.logger.get();
  }

  public setup(core: CoreSetup) {
    this.logger.debug('prototypes: Setup');
    const router = core.http.createRouter();

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
