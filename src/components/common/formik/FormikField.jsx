import React, { useCallback, useEffect, useState } from 'react';
import {
  TextField,
  FormHelperText,
  InputAdornment,
  IconButton,
  Typography,
  Grid,
  Box,
} from '@mui/material';
import { RemoveRedEyeOutlined, VisibilityOffOutlined } from '@mui/icons-material';
import PropTypes from 'prop-types';
import { useField } from 'formik';
import { useDebouncedCallback } from 'use-debounce';

function FormikField({
  name,
  label,
  textArea,
  icon,
  isPasswordField,
  type,
  placeholder,
  onBlur,
  onChange,
  isRequired,
  minRows,
  disabled,
  isRow,
  classes,
  depenpencyArray,
  labelMarginBottom,
  isLarge,
}) {
  const [field, meta, helpers] = useField(name || '');

  const { value, onBlur: onFieldBlur, ...restField } = field;
  const { touched, error } = meta;
  const { setValue } = helpers;

  const [innerValue, setInnerValue] = useState('');
  const [password, setPassword] = useState({
    show: false,
    type: 'password',
  });

  useEffect(() => {
    if (value !== undefined && value !== null) {
      setInnerValue(value);
    }
  }, [value]);

  const debouncingCallback = useDebouncedCallback(() => {
    setValue(innerValue);
  }, 500);

  const handleChange = useCallback(
    e => {
      setInnerValue(e.target.value);
      if (onChange) onChange(e);
      debouncingCallback(e);
    },
    [...depenpencyArray, onChange]
  );

  const handleBlur = useCallback(
    e => {
      onFieldBlur(e);
      if (onBlur) onBlur(e.target.value);
    },
    [...depenpencyArray, onBlur]
  );

  const togglePasswordField = useCallback(() => {
    setPassword(prevObj => ({
      show: !prevObj.show,
    }));
  }, [isPasswordField, password]);

  return (
    <Box className={classes}>

        {label && (
          <Typography
            className={isRequired ? 'required' : ''}
            variant="body2"
            sx={{ mb: `${labelMarginBottom} !important` }}
          >
            {label}
          </Typography>
        )}
     
        {textArea ? (
          <textarea
            name={name}
            {...restField}
            className="w-100"
            rows={minRows}
            onChange={e => {
              handleChange(e);
            }}
            value={innerValue}
          />
        ) : (
          <TextField
            fullWidth
            multiline={textArea}
            rows={minRows}
            id={`${name}`}
            {...restField}
            // eslint-disable-next-line no-nested-ternary
            type={isPasswordField ? (password.show ? 'text' : 'password') : type}
            value={innerValue}
            onChange={e => {
              handleChange(e);
            }}
            InputProps={{
              startAdornment: <InputAdornment position="start">{icon}</InputAdornment>,
              endAdornment: isPasswordField && (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    edge="end"
                    onClick={togglePasswordField}
                  >
                    {password.show ? <RemoveRedEyeOutlined /> : <VisibilityOffOutlined />}
                  </IconButton>
                </InputAdornment>
              ),
              sx: { fontSize: 12, },
            }}
            onBlur={handleBlur}
            placeholder={placeholder}
            disabled={disabled}
          />
        )}

        {touched && error && <FormHelperText error>{error}</FormHelperText>}
    </Box>
  );
}

FormikField.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string,
  textArea: PropTypes.bool,
  textRight: PropTypes.bool,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  inputClassName: PropTypes.string,
  placeholder: PropTypes.string,
  label: PropTypes.string,
  icon: PropTypes.element,
  isPasswordField: PropTypes.bool,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  isRequired: PropTypes.bool,
  minRows: PropTypes.number,
  classes: PropTypes.string,
  isRow: PropTypes.bool,
  depenpencyArray: PropTypes.array,
  labelMarginBottom: PropTypes.string,
  isLarge: PropTypes.bool,
};

FormikField.defaultProps = {
  type: 'text',
  minRows: 3,
  textArea: false,
  textRight: false,
  disabled: false,
  icon: null,
  className: '',
  inputClassName: '',
  placeholder: '',
  onChange: null,
  onBlur: null,
  label: '',
  isPasswordField: false,
  isRequired: false,
  classes: '',
  isRow: false,
  depenpencyArray: [],
  labelMarginBottom: '3px',
  isLarge: false,
};

export default FormikField;
