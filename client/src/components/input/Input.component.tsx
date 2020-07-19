import React from 'react';
import { useTranslation } from 'react-i18next';

import { FormControl } from 'baseui/form-control';
import { Input } from 'baseui/input';

const InputComponent = (props: InputComponentProps) => {
  const { t } = useTranslation();

  return (
    <FormControl label={props.label} error={t(props.errors[props.name]?.message)}>
      <Input id={props.name} name={props.name} inputRef={props.inputRef} error={props.errors[props.name]?.message} />
    </FormControl>
  );
};

interface InputComponentProps {
  inputRef?: any;
  name: string;
  label?: string;
  errors?: any;
}

export default InputComponent;
