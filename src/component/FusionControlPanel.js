import React from 'react';
import {
  FormControl,
  FormLabel,
  FormControlLabel,
  Radio,
  RadioGroup
} from '@material-ui/core';

const presets = {
  abilityType: {
    label: 'Ability Type',
    value: 'abilityType',
    options: [
      {
        label: 'Attack',
        value: 'attack'
      },
      {
        label: 'Support',
        value: 'support'
      }
    ]
  }
};

const FusionControlPanel = props => {
  const [option, setOption] = React.useState({});

  return (
    <FormControl>
      <FormLabel>Card Type</FormLabel>
      <RadioGroup value={option[presets.abilityType.value]} row>
        {presets.abilityType.options.map((option, index) => {
          return (
            <FormControlLabel
              value={option.value}
              control={<Radio />}
              label={option.label}
              labelPlacement="end"
              key={index}
            />
          );
        })}
      </RadioGroup>
    </FormControl>
  );
};

export default FusionControlPanel;
