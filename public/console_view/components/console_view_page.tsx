import React, { memo, useCallback, useState } from 'react';
import { ConsoleManager, ConsoleView, Console } from '@kbn/security-solution-plugin/public';
import {
  EuiFlexGroup,
  EuiFlexItem,
  EuiHorizontalRule,
  EuiSpacer,
  EuiSwitch,
  EuiTitle,
} from '@elastic/eui';

export const ConsoleViewPOCPage = memo((props) => {
  const [isConsoleViewVisible, setIsConsoleViewVisible] = useState(false);

  const handleShowConsoleOnChange = useCallback(() => {
    setIsConsoleViewVisible((prev) => !prev);
  }, []);

  return (
    <ConsoleManager>
      <EuiTitle>
        <h3>{'Full Page Overlay'}</h3>
      </EuiTitle>
      <EuiSpacer />

      <div>
        <EuiSwitch
          label={`Show Console View`}
          checked={isConsoleViewVisible}
          onChange={handleShowConsoleOnChange}
        />
      </div>

      <EuiHorizontalRule />

      <EuiTitle>
        <h3>{'Embedded console'}</h3>
      </EuiTitle>
      <EuiFlexGroup>
        <EuiFlexItem>
          <div style={{ height: '30em' }}>
            <Console
              commands={[]}
              TitleComponent={() => <>{'Test console 1 (30em fixed height)'}</>}
            />
          </div>
        </EuiFlexItem>
        <EuiFlexItem>
          <div style={{ height: '60em' }}>
            <Console
              commands={[]}
              TitleComponent={() => <>{'Test console 1 (60em fixed height)'}</>}
            />
          </div>
        </EuiFlexItem>
      </EuiFlexGroup>

      {isConsoleViewVisible && (
        <ConsoleView
          id={'my-console-1'}
          consoleProps={{ commands: [], TitleComponent: () => <>{'Full page view console'}</> }}
          showCloseButton={true}
          onClose={() => {
            setIsConsoleViewVisible(false);
          }}
        />
      )}
    </ConsoleManager>
  );
});
ConsoleViewPOCPage.displayName = 'ConsoleViewPOCPage';
