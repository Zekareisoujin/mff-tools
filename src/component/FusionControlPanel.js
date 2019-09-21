import React from 'react';
import {
  Checkbox,
  FormControl,
  FormLabel,
  FormControlLabel,
  Radio,
  RadioGroup,
  FormGroup,
  TextField
} from '@material-ui/core';
import _ from 'lodash';
import txtMap from '../data/textResource';
import { abilityType, otherOption, cardOption } from '../data/fusionConfig';
import PropTypes from 'prop-types';

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
    <>
      <FormControl>
        <FormLabel>Special Options</FormLabel>
        <FormGroup row>
          {otherOption.map((value, index) => {
            return (
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
            );
          })}
        </FormGroup>

        <FormLabel>Ability Type</FormLabel>
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

        <FormLabel>Card Type</FormLabel>
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

        <FormLabel>Card Rarity</FormLabel>
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

        <TextField
          label="Minimum card fusion chance"
          value={state[optionControlGroup.cardFusionThreshold]}
          name={optionControlGroup.cardFusionThreshold}
          onChange={handleValueChange}
          type="number"
          InputProps={{ inputProps: { min: 0, max: 100 } }}
        />

        <FormLabel>Fodder Type</FormLabel>
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

        <FormLabel>Fodder Rarity</FormLabel>
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

        <TextField
          label="Minimum card fusion chance"
          value={state[optionControlGroup.fodderFusionThreshold]}
          name={optionControlGroup.fodderFusionThreshold}
          onChange={handleValueChange}
          type="number"
          InputProps={{ inputProps: { min: 0, max: 100 } }}
        />

        <TextField
          label="Fodder base ability level"
          value={state[optionControlGroup.fodderBaseAbilityLevel]}
          name={optionControlGroup.fodderBaseAbilityLevel}
          onChange={handleValueChange}
          type="number"
          InputProps={{ inputProps: { min: 1, max: 3 } }}
        />
      </FormControl>
    </>
  );
};

FusionControlPanel.propTypes = {
  defaultState: PropTypes.object.isRequired,
  onOptionChange: PropTypes.func
};

export default FusionControlPanel;
