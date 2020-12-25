import React from 'react';

import { ListItem, ListItemLabel } from 'baseui/list';

import { ListUl } from 'components/list/List.component.style';

const List = (props: ListProps) => {
  const { items } = props;

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
