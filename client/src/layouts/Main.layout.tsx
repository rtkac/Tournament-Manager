import React from 'react';
import { connect } from 'react-redux';
import {Grid, Cell} from 'baseui/layout-grid';

import Header from 'components/header/Header.component';

const MainLayout = ({children, user, t}: MainLayoutProps)  => (
  <>
  {console.log(user)}
    <Grid>
      <Cell span={12}>
        <Header t={t} user={user} />
      </Cell>
    </Grid>
    <Grid>
      <Cell>
        {children}
      </Cell>
    </Grid>
  </>
);

interface MainLayoutProps {
  t: any;
  children?: React.ReactNode;
  user: {
    name: string;
  };
};

const mapStateToProps = (state) => ({
  user: state.user
});

export default connect(mapStateToProps)(MainLayout);