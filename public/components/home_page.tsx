import React, { memo } from 'react';
import { EuiCard } from '@elastic/eui';
import styled from '@emotion/styled';
import { PLUGIN_ID } from '../../common';
import { useKibanaServices } from '../hooks/use_kibana_services';

const EuiCardStyled = styled(EuiCard)`
  width: 25%;
  min-width: 350px;
`;

export const HomePage = memo((props) => {
  return (
    <div>
      <FileUploadPocCard />
    </div>
  );
});
HomePage.displayName = 'HomePage';

export const FileUploadPocCard = memo((props) => {
  const {
    application: { navigateToApp },
  } = useKibanaServices();

  return (
    <EuiCardStyled
      title={'File Upload POC'}
      onClick={() => {
        navigateToApp(PLUGIN_ID, { path: '/file_upload' });
      }}
    />
  );
});
FileUploadPocCard.displayName = 'FileUploadPocCard';
