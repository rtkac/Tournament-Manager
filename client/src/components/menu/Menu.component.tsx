import React from 'react';
import { StatefulMenu } from 'baseui/menu';

const Menu = (props: MenuProps) => {
  return (
    <StatefulMenu
      items={props.items}
      onItemSelect={(item) => (item.item.onClick ? item.item.onClick() : () => undefined)}
    />
  );
};

interface MenuProps {
  items: Items[];
}

interface Items {
  label: string;
  onClick?: () => void;
}

export default Menu;
