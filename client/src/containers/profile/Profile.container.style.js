import { styled } from 'baseui';

export const ProfileDiv = styled('div', ({ $theme }) => ({
  margin: '0 auto',
  maxWidth: '100%',
  width: '100%',
  [$theme.mediaQuery.large]: {
    width: '375px',
  },
}));
