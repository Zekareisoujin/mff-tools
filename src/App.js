import React from 'react';
import { Container } from '@material-ui/core';
import {
  Route,
  Switch as RouteSwitch,
  Redirect,
  withRouter
} from 'react-router-dom';
import FusionCalculator from './screen/FusionCalculator';
import WeaponCalculator from './screen/WeaponCalculator';
import Header from './component/Header';
import _ from 'lodash';

const pageList = {
  '/fusion': {
    label: 'Fusion Calculator',
    component: FusionCalculator
  },
  '/weapon': {
    label: 'Weapon Calculator',
    component: WeaponCalculator
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
