import type { CoreRequestHandlerContext, LoggerFactory } from '@kbn/core/server';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface PrototypesPluginSetup {}
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface PrototypesPluginStart {}

export interface PrototypesApiRouteHandlerContext {
  core: Promise<CoreRequestHandlerContext>;
  logger: Promise<LoggerFactory>;
}
