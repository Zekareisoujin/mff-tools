import React from 'react';
import { TextField, Paper, MenuItem } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  container: {
    position: 'relative',
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    width: '50%'
  },
  paper: {
    position: 'absolute',
    zIndex: 1,
    marginTop: theme.spacing(1),
    left: 0,
    right: 0,
    maxHeight: 300,
    overflow: 'auto'
  },
  input: {
    width: '100%'
  }
}));

const suggestions = [
  { label: 'Afghanistan' },
  { label: 'Aland Islands' },
  { label: 'Albania' },
  { label: 'Algeria' },
  { label: 'American Samoa' },
  { label: 'Andorra' },
  { label: 'Angola' },
  { label: 'Anguilla' },
  { label: 'Antarctica' },
  { label: 'Antigua and Barbuda' }
];

const WeaponSearch = props => {
  const classes = useStyles();
  const [resultOpen, setResultOpen] = React.useState(false);
  const containerRef = React.useRef(null);

  const handleClickOutside = evt => {
    if (!containerRef.current.contains(evt.target)) setResultOpen(false);
  };

  const handleResultClick = value => evt => {
    // TODO do something with result
    setResultOpen(false);
  };

  React.useEffect(() => {
    if (resultOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else document.removeEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [resultOpen]);

  return (
    <div className={classes.container} ref={containerRef}>
      <TextField
        label="Search weapon"
        placeholder="Try 'route', 'meia' or 'painful crit'"
        variant="outlined"
        className={classes.input}
        onFocus={evt => setResultOpen(true)}
      />
      <div>
        {resultOpen && (
          <Paper className={classes.paper} square>
            {suggestions.map((value, index) => (
              <MenuItem
                key={value.label}
                onClick={handleResultClick(value.label)}
              >
                {value.label}
              </MenuItem>
            ))}
          </Paper>
        )}
      </div>
    </div>
  );
};

export default WeaponSearch;
