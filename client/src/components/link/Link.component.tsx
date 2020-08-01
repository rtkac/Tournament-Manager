import React, { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { useStyletron } from 'baseui';

const LinkComponent = (props: LinkComponentProps) => {
  const [css, theme] = useStyletron();

  return (
    <Link
      to={props.to}
      className={css({
        color: theme.colors.accent400,
        textDecoration: 'none',
      })}
    >
      {props.children}
    </Link>
  );
};

interface LinkComponentProps {
  to: any;
  children?: ReactNode;
}

export default LinkComponent;
