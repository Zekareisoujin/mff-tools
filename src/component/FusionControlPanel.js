import React from 'react';
import {
  Checkbox,
  FormControl,
  FormLabel,
  FormControlLabel,
  Input,
  InputAdornment,
  InputLabel,
  Radio,
  RadioGroup,
  FormGroup,
  TextField
} from '@material-ui/core';
import _ from 'lodash';
import txtMap from '../data/textResource';
import { abilityType, otherOption, cardOption } from '../data/fusionConfig';

const defaultOptionState = {
  abilityType: abilityType[0],
  mobius_day: true,
  mog_amulet: false,
  min_bank: false,
  cardType: 'gacha',
  cardRarity: 3,
  cardFusionThreshold: 100,
  fodderType: 'scroll',
  fodderRarity: 2,
  fodderFusionThreshold: 100,
  fodderBaseAbilityLevel: 1
};

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
  const [optionState, setOptionState] = React.useState(defaultOptionState);

  const handleValueChange = evt => {
    const numVal = Number(evt.target.value);
    const newVal = Number.isNaN(numVal) ? evt.target.value : numVal;
    setOptionState({
      ...optionState,
      [evt.target.name]: newVal
    });
  };

  const handleCheckboxChange = evt => {
    setOptionState({
      ...optionState,
      [evt.target.name]: evt.target.checked
    });
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
                    checked={optionState[value]}
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
          value={optionState[optionControlGroup.abilityType]}
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
          value={optionState[optionControlGroup.cardType]}
          name={optionControlGroup.cardType}
          onChange={handleValueChange}
          row
        >
          {_.map(cardOption[optionState.abilityType], (value, key) => {
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
          value={optionState[optionControlGroup.cardRarity]}
          name={optionControlGroup.cardRarity}
          onChange={handleValueChange}
          row
        >
          {cardOption[optionState.abilityType][optionState.cardType].rarity.map(
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
          value={optionState[optionControlGroup.cardFusionThreshold]}
          name={optionControlGroup.cardFusionThreshold}
          onChange={handleValueChange}
          type="number"
          InputProps={{ inputProps: { min: 0, max: 100 } }}
        />

        <FormLabel>Fodder Type</FormLabel>
        <RadioGroup
          value={optionState[optionControlGroup.fodderType]}
          name={optionControlGroup.fodderType}
          onChange={handleValueChange}
          row
        >
          {cardOption[optionState.abilityType][optionState.cardType].fodder.map(
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
          value={optionState[optionControlGroup.fodderRarity]}
          name={optionControlGroup.fodderRarity}
          onChange={handleValueChange}
          row
        >
          {cardOption[optionState.abilityType][
            optionState.cardType
          ].fodderRarity.map(rarityValue => {
            return (
              <FormControlLabel
                value={rarityValue}
                label={`${rarityValue}★`}
                control={<Radio />}
                key={rarityValue}
              />
            );
          })}
        </RadioGroup>

        <TextField
          label="Minimum card fusion chance"
          value={optionState[optionControlGroup.fodderFusionThreshold]}
          name={optionControlGroup.fodderFusionThreshold}
          onChange={handleValueChange}
          type="number"
          InputProps={{ inputProps: { min: 0, max: 100 } }}
        />

        <TextField
          label="Fodder base ability level"
          value={optionState[optionControlGroup.fodderBaseAbilityLevel]}
          name={optionControlGroup.fodderBaseAbilityLevel}
          onChange={handleValueChange}
          type="number"
          InputProps={{ inputProps: { min: 1, max: 3 } }}
        />
      </FormControl>
    </>
  );
};

export default FusionControlPanel;
