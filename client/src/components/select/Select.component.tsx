import React from 'react';
import { useTranslation } from 'react-i18next';

import { FormControl } from 'baseui/form-control';
import { Select, Value } from 'baseui/select';

const SelectComponent = (props: SelectComponentProps) => {
  const { t } = useTranslation();
  const [value, setValue] = React.useState<Value>([]);

  // console.log(value)

  return (
    <FormControl label={props.label} error={t(props.errors[props.name]?.message)}>
      <Select
        id={props.name}
        options={props.options}
        labelKey="label"
        valueKey="id"
        onChange={({ value }) => {
          if (props.onChange) {
            props.onChange(value);
          }
          setValue(value);
        }}
        value={value}
        error={props.errors[props.name]?.message}
        isLoading={props.isLoading}
        disabled={props.isDisabled || props.isLoading}
        ref={props.selectRef}
      />
    </FormControl>
  );
};

interface SelectComponentProps {
  name: string;
  label?: string;
  options: any[];
  errors?: any;
  isLoading?: boolean;
  isDisabled?: boolean;
  selectRef?: any;
  onChange?: (value: any) => void;
}

export default SelectComponent;
