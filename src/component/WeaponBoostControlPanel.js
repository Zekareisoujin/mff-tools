import React from 'react';
import WeaponSearch from './WeaponSearch';
import { makeStyles } from '@material-ui/core/styles';
import {
  FormControl,
  FormGroup,
  FormLabel,
  FormControlLabel,
  Checkbox,
  TextField
} from '@material-ui/core';
import { otherOption } from '../data/weaponBoostConfig';
import txtMap from '../data/textResource';

const useStyles = makeStyles(theme => ({}));

const defaultState = {
  boost_natural_sp: false,
  boost_natural_mp: false,
  double_stam: false,
  bahamut_lagoon: false,
  vip_mode: false,
  max_sp_stam: 90
};

const WeaponBoostControlPanel = props => {
  const { onOptionChange } = props;
  const classes = useStyles();
  const [state, setState] = React.useState(defaultState);

  const handleStateChange = (key, newValue) => {
    const newState = {
      ...state,
      [key]: newValue
    };
    setState(newState);
    if (onOptionChange) onOptionChange(newState);
  };

  const handleValueChange = evt => {
    const numVal = Number(evt.target.value);
    const newVal = Number.isNaN(numVal) ? evt.target.value : numVal;
    handleStateChange(evt.target.name, newVal);
  };

  const handleCheckboxChange = evt => {
    handleStateChange(evt.target.name, evt.target.checked);
  };

  return (
    <div>
      <WeaponSearch />
      <FormControl>
        <FormLabel focused={false}>Settings</FormLabel>
        <FormGroup>
          {otherOption.map((value, index) => (
            <FormControlLabel
              label={txtMap[value]}
              key={index}
              control={
                <Checkbox
                  checked={state[value]}
                  name={value}
                  onChange={handleCheckboxChange}
                />
              }
            />
          ))}
        </FormGroup>
      </FormControl>
      <TextField
        label="Max SP Stamina"
        variant="outlined"
        type="number"
        value={state.max_sp_stam}
        onChange={handleValueChange}
      />
    </div>
  );
};

export default WeaponBoostControlPanel;
