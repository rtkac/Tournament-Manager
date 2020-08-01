import { styled } from 'baseui';

export const Footer = styled('footer', ({ $theme }) => ({
  alignItems: 'center',
  backgroundColor: $theme.colors.accent50,
  display: 'flex',
  fontSize: '.9rem',
  justifyContent: 'center',
  padding: '1rem',
  textAlign: 'center',
}));
