import React from 'react';
import { StyledSpinnerNext } from 'baseui/spinner';
import { colors } from 'baseui/tokens';

import { THEME } from 'config/enums';

const CustomSpinner = (props: CustomSpinnerProps) => {
  const { size, theme } = props;

  return (
    <StyledSpinnerNext
      $as="span"
      style={{
        width: size,
        height: size,
        borderLeftWidth: size < 30 ? '2px' : '',
        borderRightWidth: size < 30 ? '2px' : '',
        borderTopWidth: size < 30 ? '2px' : '',
        borderBottomWidth: size < 30 ? '2px' : '',
        borderTopColor: theme === THEME.LIGHT ? colors.blue300 : '',
        borderRightColor: theme === THEME.LIGHT ? colors.white : '',
        borderBottomColor: theme === THEME.LIGHT ? colors.white : '',
        borderLeftColor: theme === THEME.LIGHT ? colors.white : '',
      }}
    />
  )
};

interface CustomSpinnerProps {
  size: number;
  theme: THEME;
};

CustomSpinner.defaultProps = {
  size: 30,
  theme: THEME.DEFAULT,
};

export default CustomSpinner;