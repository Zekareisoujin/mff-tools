import React from 'react';
import {
  Checkbox,
  FormControl,
  FormLabel,
  FormControlLabel,
  Radio,
  RadioGroup,
  FormGroup,
  TextField,
  Grid,
  InputAdornment
} from '@material-ui/core';
import _ from 'lodash';
import txtMap from '../data/textResource';
import { abilityType, otherOption, cardOption } from '../data/fusionConfig';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  textFieldHalfWidth: {
    width: '60%'
  }
}));

const optionControlGroup = {
  abilityType: 'abilityType',
  cardType: 'cardType',
  cardRarity: 'cardRarity',
  cardFusionThreshold: 'cardFusionThreshold',
  fodderType: 'fodderType',
  fodderRarity: 'fodderRarity',
  fodderFusionThreshold: 'fodderFusionThreshold',
  fodderBaseAbilityLevel: 'fodderBaseAbilityLevel'
};

const FusionControlPanel = props => {
  const { defaultState, onOptionChange } = props;
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

  const SpecialOption = props => (
    <FormControl>
      <FormLabel focused={false}>Special Options</FormLabel>
      <FormGroup row>
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
  );

  const AbilityTypeOption = props => (
    <FormControl>
      <FormLabel focused={false}>Ability Type</FormLabel>
      <RadioGroup
        value={state[optionControlGroup.abilityType]}
        name={optionControlGroup.abilityType}
        onChange={handleValueChange}
        row
      >
        {abilityType.map((value, index) => {
          return (
            <FormControlLabel
              value={value}
              label={txtMap[value]}
              control={<Radio />}
              key={index}
            />
          );
        })}
      </RadioGroup>
    </FormControl>
  );

  const CardTypeOption = props => (
    <FormControl>
      <FormLabel focused={false}>Card Type</FormLabel>
      <RadioGroup
        value={state[optionControlGroup.cardType]}
        name={optionControlGroup.cardType}
        onChange={handleValueChange}
        row
      >
        {_.map(cardOption[state.abilityType], (value, key) => {
          return (
            <FormControlLabel
              value={key}
              label={txtMap[key]}
              control={<Radio />}
              key={key}
            />
          );
        })}
      </RadioGroup>
    </FormControl>
  );

  const CardRarityOption = props => (
    <FormControl>
      <FormLabel focused={false}>Card Rarity</FormLabel>
      <RadioGroup
        value={state[optionControlGroup.cardRarity]}
        name={optionControlGroup.cardRarity}
        onChange={handleValueChange}
        row
      >
        {cardOption[state.abilityType][state.cardType].rarity.map(
          rarityValue => {
            return (
              <FormControlLabel
                value={rarityValue}
                label={`${rarityValue}★`}
                control={<Radio />}
                key={rarityValue}
              />
            );
          }
        )}
      </RadioGroup>
    </FormControl>
  );

  const FodderTypeOption = props => (
    <FormControl>
      <FormLabel focused={false}>Fodder Type</FormLabel>
      <RadioGroup
        value={state[optionControlGroup.fodderType]}
        name={optionControlGroup.fodderType}
        onChange={handleValueChange}
        row
      >
        {cardOption[state.abilityType][state.cardType].fodder.map(
          (value, index) => {
            return (
              <FormControlLabel
                value={value}
                label={txtMap[value]}
                control={<Radio />}
                key={index}
              />
            );
          }
        )}
      </RadioGroup>
    </FormControl>
  );

  const FodderRarityOption = props => (
    <FormControl>
      <FormLabel focused={false}>Fodder Rarity</FormLabel>
      <RadioGroup
        value={state[optionControlGroup.fodderRarity]}
        name={optionControlGroup.fodderRarity}
        onChange={handleValueChange}
        row
      >
        {cardOption[state.abilityType][state.fodderType].fodderRarity.map(
          rarityValue => {
            return (
              <FormControlLabel
                value={rarityValue}
                label={`${rarityValue}★`}
                control={<Radio />}
                key={rarityValue}
              />
            );
          }
        )}
      </RadioGroup>
    </FormControl>
  );

  const CardFusionThresholdOption = props => (
    <TextField
      label="Minimum card fusion chance"
      value={state[optionControlGroup.cardFusionThreshold]}
      name={optionControlGroup.cardFusionThreshold}
      onChange={handleValueChange}
      type="number"
      className={classes.textFieldHalfWidth}
      variant="outlined"
      InputProps={{
        inputProps: { min: 0, max: 100 },
        endAdornment: <InputAdornment position="end">%</InputAdornment>
      }}
    />
  );

  const FodderFusionThresholdOption = props => (
    <TextField
      label="Minimum card fusion chance"
      value={state[optionControlGroup.fodderFusionThreshold]}
      name={optionControlGroup.fodderFusionThreshold}
      onChange={handleValueChange}
      type="number"
      fullWidth
      variant="outlined"
      InputProps={{
        inputProps: { min: 0, max: 100 },
        endAdornment: <InputAdornment position="end">%</InputAdornment>
      }}
    />
  );

  const FodderBaseAbilityLevelOption = props => (
    <TextField
      label="Fodder base ability level"
      value={state[optionControlGroup.fodderBaseAbilityLevel]}
      name={optionControlGroup.fodderBaseAbilityLevel}
      onChange={handleValueChange}
      type="number"
      fullWidth
      variant="outlined"
      InputProps={{ inputProps: { min: 1, max: 3 } }}
    />
  );
  return (
    <div className={props.className}>
      <Grid container spacing={1}>
        <Grid item md={7} xs={12}>
          <SpecialOption />
        </Grid>
        <Grid item md={5} xs={12}>
          <AbilityTypeOption />
        </Grid>
        <Grid item md={4} xs={12}>
          <CardTypeOption />
        </Grid>
        <Grid item md={3} xs={12}>
          <CardRarityOption />
        </Grid>
        <Grid item md={5} xs={12}>
          <CardFusionThresholdOption />
        </Grid>
        <Grid item md={4} xs={12}>
          <FodderTypeOption />
        </Grid>
        <Grid item md={3} xs={12}>
          <FodderRarityOption />
        </Grid>
        <Grid item md={3} xs={12}>
          <FodderFusionThresholdOption />
        </Grid>
        <Grid item md={2} xs={12}>
          <FodderBaseAbilityLevelOption />
        </Grid>
      </Grid>
    </div>
  );
};

FusionControlPanel.propTypes = {
  defaultState: PropTypes.object.isRequired,
  onOptionChange: PropTypes.func
};

export default FusionControlPanel;
