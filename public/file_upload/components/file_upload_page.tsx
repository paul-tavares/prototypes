import React, { memo, useCallback, useState } from 'react';
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
  EuiSpacer,
  EuiHorizontalRule,
  EuiAccordion,
  EuiFieldText,
  EuiAccordionProps,
  EuiFormRow,
  EuiFieldTextProps,
} from '@elastic/eui';
import { useMutation } from '@tanstack/react-query';
import { useKibanaServices } from '../../hooks/use_kibana_services';

export const FileUploadPage = memo(() => {
  const filePickerId = useGeneratedHtmlId();
  const accordionId = useGeneratedHtmlId();
  const { http } = useKibanaServices();

  const [isAccordionOpen, setIsAccordionOpen] = useState(false);
  const [indexNamePrefix, setIndexNamePrefix] = useState('');

  const {
    isLoading,
    data: uploadResponse,
    error: uploadError,
    mutate: uploadFile,
  } = useMutation(({ file }: { file: File }) => {
    const formData = new FormData();

    formData.append('file', file, file.name);

    if (indexNamePrefix) {
      formData.append('indexPrefix', indexNamePrefix);
    }

    return http.post('/api/prototypes/file_upload', {
      body: formData,
      headers: {
        'Content-Type': undefined,
      },
    });
  });

  const filePickerChangeHandler: EuiFilePickerProps['onChange'] = useCallback(
    (files) => {
      if (files && files?.length) {
        uploadFile({ file: files.item(0) });
      }
    },
    [uploadFile]
  );

  const accordionOnToggleHandler: EuiAccordionProps['onToggle'] = useCallback((isOpen) => {
    setIsAccordionOpen(isOpen);
  }, []);

  const indexNamePrefixOnChangeHandler: EuiFieldTextProps['onChange'] = useCallback((ev) => {
    setIndexNamePrefix(ev.target.value);
  }, []);

  return (
    <EuiFlexGroup>
      <EuiFlexItem grow={false} style={{ width: '450px' }}>
        <EuiFilePicker
          id={filePickerId}
          display="large"
          initialPromptText="Drop a file here, or click to select one"
          onChange={filePickerChangeHandler}
        />

        <EuiSpacer size="xl" />

        <EuiAccordion
          id={accordionId}
          initialIsOpen={isAccordionOpen}
          buttonContent="Options"
          onToggle={accordionOnToggleHandler}
        >
          <EuiSpacer />

          <EuiFormRow
            fullWidth
            label={'File storage index prefix'}
            helpText={
              'The index prefix to use for storing files. Defaults to the Endpoint values. ' +
              'If defined, then the value will be prepended to "-meta" and "data" and indexes will ' +
              'be created using those names.'
            }
          >
            <EuiFieldText
              onChange={indexNamePrefixOnChangeHandler}
              value={indexNamePrefix}
              placeholder="Index name prefix"
            />
          </EuiFormRow>
        </EuiAccordion>

        <EuiHorizontalRule />
      </EuiFlexItem>
      <EuiFlexItem>
        <EuiText>
          {isLoading && <EuiLoadingElastic size="xxl" />}

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
