import React, { ReactNode } from 'react';
import { Button, KIND, SIZE, SHAPE } from 'baseui/button';

const ButtonComponent = (props: ButtonComponentProps) => {
  return (
    <Button
      type={props.type}
      kind={props.kind}
      shape={props.shape}
      size={props.size}
      onClick={props.onClick}
      disabled={props.isLoading || props.disabled}
      isLoading={props.isLoading}
      isSelected={props.isSelected}
      overrides={
        props.overrides
          ? props.overrides
          : props.fullWidth
          ? {
              BaseButton: {
                style: () => {
                  return {
                    width: '100%',
                  };
                },
              },
            }
          : ''
      }
    >
      {props.children}
    </Button>
  );
};

ButtonComponent.defaultProps = {
  type: 'button',
  kind: KIND.primary,
  size: SIZE.default,
  shape: SHAPE.default,
};

interface ButtonComponentProps {
  type?: 'button' | 'reset' | 'submit';
  kind?: keyof typeof KIND;
  size?: keyof typeof SIZE;
  shape?: keyof typeof SHAPE;
  onClick?: (event: any) => void;
  isLoading?: boolean;
  disabled?: boolean;
  isSelected?: boolean;
  children: ReactNode;
  overrides?: any;
  fullWidth?: boolean;
}

export default ButtonComponent;
