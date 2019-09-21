import React from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemText
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import MenuIcon from '@material-ui/icons/Menu';
import { makeStyles } from '@material-ui/core/styles';
import _ from 'lodash';
import PropTypes from 'prop-types';

const useStyles = makeStyles({
  sideMenu: {
    width: 240
  }
});

const Header = props => {
  const { pageList, title } = props;

  const classes = useStyles();
  const [sideMenuOpen, setSideMenuOpen] = React.useState(false);

  const openSideMenu = () => {
    setSideMenuOpen(true);
  };

  const closeSideMenu = () => {
    setSideMenuOpen(false);
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={openSideMenu}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6">
            Mobius FF Tools{title && ` - ${title}`}
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer open={sideMenuOpen} onClose={closeSideMenu}>
        <div className={classes.sideMenu}>
          <List>
            {_.map(pageList, (page, path) => {
              return (
                <ListItem
                  button
                  component={Link}
                  to={path}
                  onClick={closeSideMenu}
                  key={path}
                >
                  <ListItemText primary={page.label} />
                </ListItem>
              );
            })}
          </List>
        </div>
      </Drawer>
    </>
  );
};

Header.propTypes = {
  pageList: PropTypes.object,
  title: PropTypes.string
};

export default Header;
