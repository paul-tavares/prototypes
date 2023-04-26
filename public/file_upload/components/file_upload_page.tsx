import React, { memo, useCallback } from 'react';
import {
  EuiFlexGroup,
  EuiFlexItem,
  EuiText,
  EuiFilePicker,
  useGeneratedHtmlId,
  EuiFilePickerProps,
  EuiLoadingElastic,
  EuiPanel,
  EuiCodeBlock,
} from '@elastic/eui';
import { useMutation } from '@tanstack/react-query';
import { useKibanaServices } from '../../hooks/use_kibana_services';

export const FileUploadPage = memo(() => {
  const filePickerId = useGeneratedHtmlId();
  const { http } = useKibanaServices();
  const {
    isLoading,
    data: uploadResponse,
    error: uploadError,
    mutate: uploadFile,
  } = useMutation(({ file }: { file: File }) => {
    const formData = new FormData();

    formData.append('file', file, file.name);

    return http.post('/api/prototypes/file_upload', {
      body: formData,
      headers: {
        'Content-Type': undefined,
      },
    });
  });

  const filePickerChangeHandler: EuiFilePickerProps['onChange'] = useCallback(
    (files) => {
      if (files) {
        uploadFile({ file: files.item(0) });
      }
    },
    [uploadFile]
  );

  return (
    <EuiFlexGroup>
      <EuiFlexItem grow={false}>
        <EuiFilePicker
          id={filePickerId}
          display="large"
          initialPromptText="Drop a file here, or click to select one"
          onChange={filePickerChangeHandler}
        />
      </EuiFlexItem>
      <EuiFlexItem>
        <EuiText>
          {isLoading && <EuiLoadingElastic />}

          {!isLoading && uploadError && (
            <EuiPanel color="danger">
              <EuiCodeBlock>{JSON.stringify(uploadError, null, 2)}</EuiCodeBlock>
            </EuiPanel>
          )}

          {!isLoading && !uploadError && uploadResponse && (
            <EuiPanel color="success">
              <EuiCodeBlock>{JSON.stringify(uploadResponse, null, 2)}</EuiCodeBlock>
            </EuiPanel>
          )}
        </EuiText>
      </EuiFlexItem>
    </EuiFlexGroup>
  );
});
FileUploadPage.displayName = 'FileUploadPage';
