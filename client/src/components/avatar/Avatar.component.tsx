import React from 'react';
import { Avatar } from 'baseui/avatar';

const AvatarComponent = (props: AvatarComponentProps) => {
  return <Avatar name={props.name} size="scale1600" src={props.image} />;
};

interface AvatarComponentProps {
  name: string;
  image?: string;
}

export default AvatarComponent;
