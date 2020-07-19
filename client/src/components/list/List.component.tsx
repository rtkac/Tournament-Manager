import React from 'react';

import { useStyletron } from 'baseui';
import { ListItem, ListItemLabel } from 'baseui/list';

import { ListUl } from 'components/list/List.component.style';

const List = (props: ListProps) => {
  const { items } = props;

  const [css, theme] = useStyletron();

  return (
    <ListUl>
      {items.map((item, index) => (
        <ListItem key={index} endEnhancer={() => <ListItemLabel>{item.value}</ListItemLabel>}>
          <ListItemLabel>{item.label}</ListItemLabel>
        </ListItem>
      ))}
    </ListUl>
  );
};

interface ListProps {
  items: Item[];
}

interface Item {
  label: string;
  value: string;
}

export default List;
