import React from 'react';
import { History, LocationState } from 'history';
import { connect } from 'react-redux';

import { Grid, Cell } from 'baseui/layout-grid';

import Header from 'components/header/Header.component';

import { MainLayoutDiv, MainLayoutContentDiv } from './Main.layout.style.js';

const MainLayout = (props: MainLayoutProps) => {
  const {
    t,
    history: { push },
    children,
    user,
    isAuthenticating,
    isAuthenticated,
  } = props;

  return (
    <MainLayoutDiv>
      <Grid>
        <Cell span={12}>
          <Header t={t} push={push} user={user} isAuthenticating={isAuthenticating} isAuthenticated={isAuthenticated} />
        </Cell>
      </Grid>
      <Grid>
        <Cell span={12}>
          <MainLayoutContentDiv>{children}</MainLayoutContentDiv>
        </Cell>
      </Grid>
    </MainLayoutDiv>
  );
};

interface MainLayoutProps {
  t: any;
  history: History<LocationState>;
  children?: React.ReactNode;
  isAuthenticating: boolean;
  isAuthenticated: boolean;
  user: {
    name: string;
  };
}

const mapStateToProps = (state) => ({
  user: state.user.info,
});

export default connect(mapStateToProps)(MainLayout);
