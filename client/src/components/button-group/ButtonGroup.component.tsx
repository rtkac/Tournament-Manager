import React from 'react';

import { useStyletron } from 'baseui';

import Button from 'components/button/Button.component';

import { ButtonGroupDiv } from 'components/button-group/ButtonGroup.component.style';

const ButtonGroup = (props: ButtonGroupProps) => {
  const { items } = props;

  const [css, theme] = useStyletron();
  const space = css({ marginLeft: theme.sizing.scale600 });

  return (
    <ButtonGroupDiv>
      {items.map((btn, index) => (
        <>
          <Button
            key={index}
            {...btn}
            overrides={{
              BaseButton: {
                style: () => {
                  return {
                    flex: '1 1 40px',
                    marginBottom: '1rem',
                  };
                },
              },
            }}
          >
            {btn.label}
          </Button>
          {index + 1 < items.length && <span className={space} />}
        </>
      ))}
    </ButtonGroupDiv>
  );
};

interface ButtonGroupProps {
  items: Item[];
}

interface Item {
  label: string;
}

export default ButtonGroup;
