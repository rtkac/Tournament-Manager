import React from 'react';
import { History, LocationState } from 'history';
import { RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import T from 'i18n/translationsKeyMapping';

import { FlexGrid, FlexGridItem } from 'baseui/flex-grid';
import { Card, StyledBody } from 'baseui/card';

import Avatar from 'components/avatar/Avatar.component';
import Menu from 'components/menu/Menu.component';

import { MainLayoutContentDiv } from 'layouts/Main.layout.style';
import { AvatarDiv } from './Profile.layout.subLayout';

import { ROUTES } from 'router/routes';

const wideGridItemProps = {
  overrides: {
    Block: {
      style: ({ $theme }) => ({
        width: '100%',
        [$theme.mediaQuery.large]: {
          width: `calc((200% - ${$theme.sizing.scale800}) / 3) !important`,
        },
      }),
    },
  },
};

const Profile = (props: ProfileProps) => {
  const { t, history, userInfo, children } = props;

  return (
    <MainLayoutContentDiv>
      <div style={{ width: '100%' }}>
        <FlexGrid
          flexGridColumnCount={[1, 1, 3]}
          flexGridColumnGap="scale800"
          flexGridRowGap="scale800"
          marginBottom="scale800"
          flexDirection={['column', 'column', 'row']}
        >
          <FlexGridItem>
            <Card>
              <StyledBody>
                <AvatarDiv>
                  <Avatar name={`${userInfo.name || ''} ${userInfo.lastName || ''}`} />
                </AvatarDiv>
                <Menu
                  items={[
                    {
                      label: t(T.PROFILE.MENU.PROFILE.LABEL),
                      onClick: () => history.push(ROUTES.PROFILE),
                    },
                    {
                      label: t(T.PROFILE.MENU.CHANGE_PASSWORD.LABEL),
                      onClick: () => history.push(ROUTES.CHANGE_PASSWORD),
                    },
                  ]}
                />
              </StyledBody>
            </Card>
          </FlexGridItem>
          <FlexGridItem display="none" />
          <FlexGridItem {...wideGridItemProps}>{children}</FlexGridItem>
        </FlexGrid>
      </div>
    </MainLayoutContentDiv>
  );
};

interface ProfileProps extends RouteComponentProps {
  t: any;
  history: History<LocationState>;
  children?: React.ReactNode;
  userInfo: {
    name: string;
    lastName: string;
  };
}

const mapStateToProps = (state) => ({
  userInfo: state.user.info,
});

export default connect(mapStateToProps)(Profile);
