import React from 'react';
import { useTranslation } from 'react-i18next';

import { FormControl } from 'baseui/form-control';
import { styled } from 'baseui';
import { Select, Value } from 'baseui/select';
import { expandBorderStyles } from 'baseui/styles';

const ColorSwatch = styled('div', (props: any) => {
  return {
    width: props.$theme.sizing.scale300,
    height: props.$theme.sizing.scale300,
    marginRight: props.$theme.sizing.scale200,
    display: 'inline-block',
    backgroundColor: props.$color,
    verticalAlign: 'baseline',
    ...expandBorderStyles(props.$theme.borders.border400),
  };
});

const getLabel = ({ option }: any) => {
  return (
    <>
      <ColorSwatch $color={option.color} />
      {option.id}
    </>
  );
};

const SelectComponent = (props: SelectComponentProps) => {
  const { t } = useTranslation();
  const [value, setValue] = React.useState<Value>([]);

  return (
    <FormControl label={props.label} error={t(props.errors[props.name]?.message)}>
      <Select
        id={props.name}
        options={props.options}
        labelKey="id"
        valueKey="color"
        onChange={(options) => setValue(options.value)}
        value={value}
        getOptionLabel={getLabel}
        getValueLabel={getLabel}
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
}

export default SelectComponent;
