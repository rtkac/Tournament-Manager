import React from 'react';
import { Button, SIZE } from 'baseui/button';
import { TriangleDown } from 'baseui/icon';
import { Popover } from 'baseui/popover';
import { StatefulMenu } from 'baseui/menu';

const Dropdown = (props: DropdownProps) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <Popover
      isOpen={isOpen}
      onClick={() => setIsOpen(s => !s)}
      content={
        <StatefulMenu
          items={props.items}
          onItemSelect={(selectedItem) => {
            selectedItem.item.onClick && selectedItem.item.onClick();
            setIsOpen(false)
          }}
        />
      }
    >
      <Button
        {...props}
        endEnhancer={() => <TriangleDown size={24} />}
      >
        {props.children}
      </Button>
    </Popover>
  );
};

interface DropdownProps {
  children: React.ReactNode;
  items: Items[];
  size?: keyof typeof SIZE;
};

interface Items {
  label: string;
  onClick?: any;
};

Dropdown.defaultProps = {
  size: SIZE.compact,
};

export default Dropdown;