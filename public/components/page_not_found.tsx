import React, { memo } from 'react';
import { EuiPanel } from '@elastic/eui';

export const PageNotFound = memo((props) => {
  return <EuiPanel paddingSize="xl">{'PageNotFound placeholder'}</EuiPanel>;
});
PageNotFound.displayName = 'PageNotFound';
