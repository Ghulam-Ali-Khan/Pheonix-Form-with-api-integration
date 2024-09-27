/* eslint-disable */
import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Grid, FormHelperText, Typography, useMediaQuery, Box } from '@mui/material';
import { useField, useFormikContext } from 'formik';
import moment from 'moment';

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

function FormikDatePicker({
  name,
  views,
  placeholder,
  onChange,
  minDate,
  maxDate,
  disabled,
  excludeDates,
  disableFuture,
  disablePast,
  label,
  isRow,
  isRequired,
  classes,
  dependencyArray,
}) {
  const isLargeScreen = useMediaQuery(theme => theme.breakpoints.up('md'));
  const { values } = useFormikContext();
  const [field, meta, helpers] = useField(name || '');
  const { setValue } = helpers;
  const { value } = field;
  const { error, touched } = meta;

  const [innerValue, setInnerValue] = useState(null);

  useEffect(() => {
    if (value !== '' && value !== undefined && value !== null) {
      setInnerValue(moment(value, 'YYYY-MM-DD'));
    } else {
      setInnerValue(null);
    }
  }, [value]);

  const handleChange = useCallback(
    newMoment => {
      const formattedValue = newMoment?.format('YYYY-MM-DD');

      if (newMoment !== null || newMoment !== undefined) {
        setValue(formattedValue);
        setInnerValue(newMoment);
      } else {
        setValue('');
        setInnerValue('');
      }

      if (onChange) onChange(formattedValue, name);
    },
    [values, ...dependencyArray]
  );

  return (
    <Box className={`${classes}`}>

        {label && (
          <Typography
            className={isRequired ? 'required' : ''}
            variant="body2"
            sx={{ mb: '2px !important' }}
            id={name}
          >
            {label}
          </Typography>
        )}

        <LocalizationProvider dateAdapter={AdapterMoment}>
          <DatePicker
            className="w-100"
            name={name}
            views={views}
            value={innerValue}
            onChange={handleChange}
            disabled={disabled}
            placeholder={placeholder}
            disablePast={disablePast}
            disableFuture={disableFuture}
            minDate={minDate}
            maxDate={maxDate}
            shouldDisableDate={date => {
              let newDate = '';

              excludeDates?.forEach(item => {
                if (date.format('YYYY-MM-DD') === item) {
                  newDate = item;
                }
              });

              return !!newDate;
            }}
            desktopModeMediaQuery={
              isLargeScreen ? '@media (pointer: fine)' : '@media (pointer: coarse)'
            }
            slotProps={{ textField: { size: 'small' } }}
            sx={{
              width:'100% !important',
              '& .MuiInputBase-root': {
                height: '35px !important',
                fontSize: '12px !important',
              },
              '& button': {
                padding: '3px',
                marginRight: '-5px',
              },
            }}
          />

          {touched && error && <FormHelperText error>{error}</FormHelperText>}
        </LocalizationProvider>

    </Box>
  );
}

FormikDatePicker.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  views: PropTypes.any,
  label: PropTypes.string,
  minDate: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
  maxDate: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
  disablePast: PropTypes.bool,
  disableFuture: PropTypes.bool,
  excludeDates: PropTypes.arrayOf(PropTypes.string),
  isRow: PropTypes.bool,
  isRequired: PropTypes.bool,
  classes: PropTypes.string,
  dependencyArray: PropTypes.array,
};

FormikDatePicker.defaultProps = {
  label: '',
  placeholder: '',
  minDate: undefined,
  maxDate: undefined,
  views: ['month', 'year', 'day'],
  // excludeDates: [],
  disabled: false,
  onChange: () => {},
  disablePast: false,
  disableFuture: false,
  excludeDates: [],
  isRow: false,
  isRequired: false,
  classes: null,
  dependencyArray: [],
};

export default FormikDatePicker;
