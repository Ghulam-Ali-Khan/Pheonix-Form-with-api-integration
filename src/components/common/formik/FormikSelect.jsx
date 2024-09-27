import React, { useCallback, useMemo } from 'react';
import { FormHelperText, Typography, Button, Grid2, Box } from '@mui/material';
import PropTypes from 'prop-types';
import Select from 'react-select';
import { useField } from 'formik';


const CUSTOM_BUTTON_VALUE = 'custom-menu-button';

 const fieldStyles = primaryColor => ({
  control: (provided, state) => ({
    ...provided,
    width:'100%',
    minHeight: '35px',
    // height: '35px',
    fontSize: '12px',
    border: state.isFocused
      ? `1.8px solid ${primaryColor} !important`
      : `1px solid ${provided.borderColor}`,
    '&:hover': {
      borderColor: state.isFocused
        ? `1.8px solid ${primaryColor} !important`
        : `1px solid ${provided.borderColor}`,
    },
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected ? primaryColor : provided.backgroundColor,
    color: state.isSelected ? '#fff' : provided.color,
    fontSize: '12px',
    '&:hover': {
      backgroundColor: state.isSelected ? primaryColor : provided.backgroundColor,
      color: state.isSelected ? '#fff' : provided.color,
    },
  }),
});

function FormikSelect({
  name,
  options,
  disabled,
  onChange,
  onBlur,
  isGrouped,
  isClearable,
  onMenuCustomButtonClick,
  menuCustomButtonLabel,
  label,
  placeholder,
  menuPosition,
  menuPlacement,
  menuShouldBlockScroll,
  formatOptionLabel,
  isRequired,
  isRow,
  classes,
  isOpen,
  depenpencyArray,
  onKeyDown
}) {
  const [field, meta, helpers] = useField(name);

  const { value, onBlur: onFieldBlur } = field;
  const { touched, error } = meta;
  const { setValue } = helpers;

  const handleChange = useCallback(selectedOption => {
    if (selectedOption?.value === CUSTOM_BUTTON_VALUE) return;

    const fieldValue = selectedOption?.value || null;
    setValue(fieldValue);

    if (onChange) onChange(fieldValue);
  }, [...depenpencyArray]);

  const handleBlur = useCallback(event => {
    onFieldBlur(event);

    if (onBlur) onBlur(name, event);
  }, [...depenpencyArray, value]);

  const allOptions = useMemo(
    () => (isGrouped ? options.map(item => item.options).flatMap(item => item) : [...options]),
    [options]
  );
  const selectedOption = useMemo(
    () => allOptions.find(option => option?.value === value ?? ''),
    [allOptions, value]
  );

  const customButtonOption = {
    label: (
      <Button color="primary" onClick={onMenuCustomButtonClick}>
        {menuCustomButtonLabel}
      </Button>
    ),
    value: CUSTOM_BUTTON_VALUE,
  };

  const modifiedOptions = useMemo(
    () => [...options, ...(onMenuCustomButtonClick ? [customButtonOption] : [])],
    [options, onMenuCustomButtonClick]
  );

  return (
    <Box
      className={classes}
      sx={{ '& .react-select__option--is-selected, & .react-select__option--is-selected:hover': { backgroundColor: '#ffeb25',}, width:'100%' }}
    >

        {label && (
          <Typography
            className={isRequired ? 'required' : ''}
            variant="body2"
            sx={{ mb: '2px !important' }}
          >
            {label}
          </Typography>
        )}
        <Select
          autoComplete="false"
          menuIsOpen={isOpen}
          options={modifiedOptions}
          name={name}
          onChange={handleChange}
          onBlur={handleBlur}
          onKeyDown={onKeyDown}
          value={selectedOption || null}
          classNamePrefix="react-select"
          isDisabled={disabled}
          disabled={disabled}
          isClearable={isClearable}
          styles={fieldStyles('#ffeb25')}
          placeholder={placeholder}
          menuPosition={menuPosition}
          menuPlacement={menuPlacement}
          menuShouldBlockScroll={menuShouldBlockScroll}
          formatOptionLabel={formatOptionLabel}
        />
        {touched && error && <FormHelperText error>{error}</FormHelperText>}
      </Box>
  );
}

FormikSelect.propTypes = {
  name: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.object),
  label: PropTypes.string,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  menuPosition: PropTypes.string,
  menuPlacement: PropTypes.string,
  menuShouldBlockScroll: PropTypes.bool,
  isGrouped: PropTypes.bool,
  isClearable: PropTypes.bool,
  formatOptionLabel: PropTypes.func,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  onMenuCustomButtonClick: PropTypes.func,
  menuCustomButtonLabel: PropTypes.string,
  isRequired: PropTypes.bool,
  isRow: PropTypes.bool,
  isOpen: PropTypes.bool,
  classes: PropTypes.string,
  depenpencyArray: PropTypes.array,
  onKeyDown: PropTypes.any
};

FormikSelect.defaultProps = {
  isOpen: undefined,
  label: '',
  options: [],
  placeholder: '',
  disabled: false,
  menuPosition: 'absolute',
  menuPlacement: 'bottom',
  menuShouldBlockScroll: false,
  isGrouped: false,
  isClearable: false,
  formatOptionLabel: null,
  onChange: null,
  onBlur: null,
  onMenuCustomButtonClick: null,
  menuCustomButtonLabel: 'Add New',
  isRequired: false,
  isRow: false,
  classes: '',
  depenpencyArray: [],
  onKeyDown: () => {}
};

export default FormikSelect;
