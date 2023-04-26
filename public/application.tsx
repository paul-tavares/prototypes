import React from 'react';
import ReactDOM from 'react-dom';
import { AppMountParameters, CoreStart } from '@kbn/core/public';
import { AppPluginStartDependencies } from './types';
import { PrototypesApp } from './components/app';

export const renderApp = (
  coreStart: CoreStart,
  startDep: AppPluginStartDependencies,
  { appBasePath, element, history }: AppMountParameters
) => {
  ReactDOM.render(
    <PrototypesApp
      basename={appBasePath}
      history={history}
      coreStart={coreStart}
      startDep={startDep}
    />,
    element
  );

  return () => ReactDOM.unmountComponentAtNode(element);
};
