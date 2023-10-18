import React, { memo, useCallback, useMemo, useState } from 'react';
import { ConsoleView, Console, useConsoleManager } from '@kbn/security-solution-plugin/public';
import {
  EuiFlexGroup,
  EuiFlexItem,
  EuiHorizontalRule,
  EuiSpacer,
  EuiSwitch,
  EuiTitle,
  EuiCallOut,
} from '@elastic/eui';

export const ConsoleViewPOCPage = memo((props) => {
  const managedConsoleId = 'my-console-1';
  const [isConsoleViewVisible, setIsConsoleViewVisible] = useState(false);
  const consoleManager = useConsoleManager();

  const handleShowConsoleOnChange = useCallback(() => {
    setIsConsoleViewVisible((prev) => !prev);
  }, []);

  const embeddedConsole = useMemo(() => {
    const registeredConsole = consoleManager.getOne(managedConsoleId);

    // Check on `isConsoleViewVisible` here just to ensure useCallback is re-eval()'d
    if (!registeredConsole && typeof isConsoleViewVisible === 'boolean') {
      return (
        <EuiCallOut>{'Managed console (switch above) has not been displayed yet.'}</EuiCallOut>
      );
    }

    return registeredConsole!.embed();
  }, [consoleManager, isConsoleViewVisible]);

  return (
    <div>
      <EuiTitle>
        <h3>{'Full Page Overlay (managed console)'}</h3>
      </EuiTitle>
      <EuiSpacer />

      <div>
        <EuiSwitch
          label={`Show Console View`}
          checked={isConsoleViewVisible}
          onChange={handleShowConsoleOnChange}
        />
      </div>

      <EuiSpacer />
      <EuiTitle size="s">
        <h4>{'Embedded Managed Console (same one as above)'}</h4>
      </EuiTitle>
      <EuiSpacer />
      <div style={{ height: '25em' }}>{embeddedConsole}</div>
      <EuiSpacer size="xxl" />

      <EuiHorizontalRule />

      <EuiTitle>
        <h3>{'Embedded console (NOT managed)'}</h3>
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
          id={managedConsoleId}
          consoleProps={{ commands: [], TitleComponent: () => <>{'Full page view console'}</> }}
          showCloseButton={true}
          onHide={() => {
            setIsConsoleViewVisible(false);
          }}
        />
      )}
    </div>
  );
});
ConsoleViewPOCPage.displayName = 'ConsoleViewPOCPage';
