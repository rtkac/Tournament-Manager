import { styled } from 'baseui';

export const MainLayoutDiv = styled('div', () => ({
  minHeight: '100vh',
}));

export const MainLayoutContentDiv = styled('div', () => ({
  display: 'flex',
  justifyContent: 'center',
  marginBottom: '2rem',
  marginTop: '2rem',
  minHeight: 'calc(100vh - 183px)',
  width: '100%',
}));

export const ContentDiv = styled('div', () => ({
  width: '100%',
}));
