import React, { memo } from 'react';
import { ConsoleManager } from '@kbn/security-solution-plugin/public';
import { ConsoleViewPOCPage } from './components/console_view_page';

export const ConsoleViewPagesWrapper = memo(() => {
  return (
    <ConsoleManager>
      <ConsoleViewPOCPage />
    </ConsoleManager>
  );
});
ConsoleViewPagesWrapper.displayName = 'ConsoleViewPagesWrapper';
