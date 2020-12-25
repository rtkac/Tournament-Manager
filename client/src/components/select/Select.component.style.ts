import { styled } from 'baseui';
import { expandBorderStyles } from 'baseui/styles';

export const ColorSwatch = styled('div', (props: any) => {
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
