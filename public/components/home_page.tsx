import React, { memo } from 'react';
import { EuiCard } from '@elastic/eui';
import styled from '@emotion/styled';
import { useKibana } from '@kbn/kibana-react-plugin/public';
import { KibanaServices } from '../types';
import { PLUGIN_ID } from '../../common';

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
  } = useKibana<KibanaServices>().services;

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
