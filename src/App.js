import React from 'react';
import { Container } from '@material-ui/core';
import { Route, withRouter } from 'react-router-dom';
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
  const [navTitle, setNavTitle] = React.useState(
    pageList[location.pathname].label
  );

  React.useEffect(() => {
    setNavTitle(pageList[location.pathname].label);
  }, [location.pathname]);

  return (
    <>
      <Header pageList={pageList} title={navTitle} />
      <Container maxWidth="md">
        {_.map(pageList, (page, path) => {
          return <Route path={path} component={page.component} key={path} />;
        })}
      </Container>
    </>
  );
};

export default withRouter(App);
