import React from 'react';
import { FusionControlPanel, FusionRateTable } from '../component';
import computeFusionTable from '../util/fusionCalc';
import { abilityType, fusionTable } from '../data/fusionConfig';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  panel: {
    paddingTop: theme.spacing(3)
  }
}));

const defaultOptionState = {
  abilityType: abilityType[0],
  mobius_day: true,
  mog_amulet: false,
  min_bank: false,
  cardType: 'gacha',
  cardRarity: 3,
  cardFusionThreshold: 100,
  fodderType: 'scroll',
  fodderRarity: 3,
  fodderFusionThreshold: 100,
  fodderBaseAbilityLevel: 1
};

const FusionCalculator = props => {
  const classes = useStyles();
  const [state, setState] = React.useState({ option: defaultOptionState });

  const handleOptionChange = optionState => {
    setState({
      ...state,
      option: optionState
    });
  };

  const option = state.option;
  const md = option.mobius_day ? 'mobius' : 'standard';
  const mainTable =
    option.cardType == option.fodderType &&
    option.cardRarity == option.fodderRarity
      ? option.cardType == 'gacha'
        ? 'gacha'
        : 'drop'
      : 'mix';
  const fodderTable = option.fodderType == 'gacha' ? 'gacha' : 'drop';
  const crossRateTable = fusionTable[option.abilityType][mainTable][md];
  const fodderRateTable = fusionTable[option.abilityType][fodderTable][md];

  const levelFromRarity = (rarity, abilityType) => {
    return abilityType == 'attack' ? rarity * 2 : rarity + 1;
  };
  const cardLevel = levelFromRarity(option.cardRarity, option.abilityType);
  const fodderLevel = levelFromRarity(option.fodderRarity, option.abilityType);

  const cardRate = option.mog_amulet
    ? Math.ceil((option.cardFusionThreshold * 2) / 3)
    : option.cardFusionThreshold;
  const slotCount = option.mog_amulet ? 4 : 5;

  const { cardCost, fodderCost } = computeFusionTable(
    {
      crossRateTable,
      fodderRateTable,
      cardLevel,
      cardRate,
      fodderLevel,
      fodderRate: option.fodderFusionThreshold,
      slotCount,
      minFodderLevel: option.fodderBaseAbilityLevel
    },
    option.min_bank
  );

  return (
    <>
      <FusionControlPanel
        className={classes.panel}
        defaultState={defaultOptionState}
        onOptionChange={handleOptionChange}
      />
      <FusionRateTable
        className={classes.panel}
        cardCost={cardCost}
        fodderCost={fodderCost}
        cardRateTable={crossRateTable}
        fodderRateTable={fodderRateTable}
        fodderBaseAbilityLevel={option.fodderBaseAbilityLevel}
      />
    </>
  );
};

export default FusionCalculator;
