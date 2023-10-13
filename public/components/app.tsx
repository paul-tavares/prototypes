import React from 'react';
import { FormattedMessage, I18nProvider } from '@kbn/i18n-react';
import { Router, Switch, Route } from 'react-router-dom';
import { KibanaContextProvider } from '@kbn/kibana-react-plugin/public';

import {
  EuiPage,
  EuiPageBody,
  EuiPageContent_Deprecated as EuiPageContent,
  EuiPageContentBody_Deprecated as EuiPageContentBody,
  EuiPageHeader,
  EuiTitle,
} from '@elastic/eui';

import { CoreStart, ScopedHistory } from '@kbn/core/public';

import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { EuiThemeProvider } from '@kbn/kibana-react-plugin/common';
import { PLUGIN_NAME } from '../../common';
import { AppPluginStartDependencies } from '../types';
import { PageNotFound } from './page_not_found';
import { HomePage } from './home_page';
import { FileUploadPage } from '../file_upload';
import { ConsoleViewPOCPage } from '../console_view/components/console_view_page';

interface PrototypesAppDeps {
  basename: string;
  history: ScopedHistory;
  coreStart: CoreStart;
  startDep: AppPluginStartDependencies;
}

const queryClient = new QueryClient();

export const PrototypesApp = ({ basename, history, coreStart, startDep }: PrototypesAppDeps) => {
  return (
    <KibanaContextProvider
      services={{
        appName: PLUGIN_NAME,
        appBasePath: basename,
        startDep,
        ...coreStart,
      }}
    >
      <EuiThemeProvider darkMode={false}>
        <QueryClientProvider client={queryClient}>
          <Router history={history}>
            <I18nProvider>
              <>
                <EuiPage paddingSize="xl">
                  <EuiPageBody>
                    <EuiPageHeader>
                      <EuiTitle size="l">
                        <h1>
                          <FormattedMessage
                            id="prototypes.helloWorldText"
                            defaultMessage="{name}"
                            values={{ name: PLUGIN_NAME }}
                          />
                        </h1>
                      </EuiTitle>
                    </EuiPageHeader>
                    <EuiPageContent>
                      <EuiPageContentBody>
                        <Router history={history}>
                          <Switch>
                            <Route path="/" exact component={HomePage} />

                            <Route path="/file_upload" exact component={FileUploadPage} />
                            <Route path="/console_view" exact component={ConsoleViewPOCPage} />

                            <Route path="*" component={PageNotFound} />
                          </Switch>
                        </Router>
                      </EuiPageContentBody>
                    </EuiPageContent>
                  </EuiPageBody>
                </EuiPage>
              </>
            </I18nProvider>
          </Router>
        </QueryClientProvider>
      </EuiThemeProvider>
    </KibanaContextProvider>
  );
};
