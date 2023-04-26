import { PluginInitializerContext } from '../../../src/core/server';
import { PrototypesPlugin } from './plugin';

//  This exports static code and TypeScript types,
//  as well as, Kibana Platform `plugin()` initializer.

export function plugin(initializerContext: PluginInitializerContext) {
  return new PrototypesPlugin(initializerContext);
}

export type { PrototypesPluginSetup, PrototypesPluginStart } from './types';
