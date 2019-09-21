import React from 'react';
import { Container } from '@material-ui/core';
import {
  Route,
  Switch as RouteSwitch,
  Redirect,
  withRouter
} from 'react-router-dom';
import FusionCalc from './screen/FusionCalc';
import WeaponCalc from './screen/WeaponCalc';
import Header from './component/Header';
import _ from 'lodash';

const pageList = {
  '/fusion': {
    label: 'Fusion Calculator',
    component: FusionCalc
  },
  '/weapon': {
    label: 'Weapon Calculator',
    component: WeaponCalc
  }
};

const App = props => {
  const { location } = props;

  return (
    <>
      <Header pageList={pageList} />
      <Container maxWidth="md">
        <RouteSwitch>
          <Redirect from="/" exact to="/fusion" />
          {_.map(pageList, (page, path) => {
            return <Route path={path} component={page.component} key={path} />;
          })}
        </RouteSwitch>
      </Container>
    </>
  );
};

export default withRouter(App);
