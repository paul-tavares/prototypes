import './index.scss';

import { PrototypesPlugin } from './plugin';

// This exports static code and TypeScript types,
// as well as, Kibana Platform `plugin()` initializer.
export function plugin() {
  return new PrototypesPlugin();
}
export type { PrototypesPluginSetup, PrototypesPluginStart } from './types';
