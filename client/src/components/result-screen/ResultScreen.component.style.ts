import { styled } from 'baseui';

export const ResultDiv = styled('div', () => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100%',
}));

export const ResultTitle = styled('h1', () => ({
  fontWeight: 400,
  textAlign: 'center',
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  marginBottom: '0.5rem',
}));

export const ResultIcon = styled<
  {
    $loading?: boolean;
  },
  'span'
>('span', ({ $loading }) => ({
  width: '1.8rem',
  marginRight: '1rem',
  position: 'relative',
  top: $loading ? '2px' : '5px',
}));

export const ResultSubTitle = styled('div', () => ({
  fontSize: '1.2rem',
  lineHeight: '1.8rem',
  textAlign: 'center',
  display: 'flex',
  justifyContent: 'center',
  width: '100%',
}));
