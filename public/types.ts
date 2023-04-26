import { CoreStart } from '@kbn/core-lifecycle-browser';
import { NavigationPublicPluginStart } from '@kbn/navigation-plugin/public';

export interface PrototypesPluginSetup {
  getGreeting: () => string;
}
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface PrototypesPluginStart {}

export interface AppPluginStartDependencies {
  navigation: NavigationPublicPluginStart;
}

export interface KibanaServices extends CoreStart {
  appName: string;
  appBasePath: string;
  startDependencies: AppPluginStartDependencies;
}
