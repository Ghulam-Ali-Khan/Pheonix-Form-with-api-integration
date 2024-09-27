import { FormHelperText } from '@mui/material';
import { useFormikContext } from 'formik';
import React, { memo } from 'react';

function ErrorFocus() {
  const { errors } = useFormikContext();
  const errorsKeys = Object?.keys(errors);
  if (errorsKeys?.length > 0) {
    const idExist = document.getElementById(errorsKeys[0]);
    if (idExist) {
      return '';
    }
    return (
      <FormHelperText sx={{ mt: 3, width: '100%', textAlign: 'start' }} error>
        <span style={{ textTransform: 'capitalize' }}>
          {`${errorsKeys[0]?.replaceAll('_', ' ')} : `}
        </span>
        {errors[errorsKeys[0]]}
      </FormHelperText>
    );
  }
  return '';
}

export default memo(ErrorFocus);
