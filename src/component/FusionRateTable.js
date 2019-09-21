import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import {
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Typography
} from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  table: {
    marginTop: theme.spacing(1)
  },
  tableTitle: {
    paddingLeft: theme.spacing(2)
  }
}));

const getBasketContent = (basket, tableRate) => {
  const basketContent = {};
  for (var j = 0; j < basket.length; j++) {
    const item = basket[j];
    if (!basketContent[item]) {
      basketContent[item] = {
        rate: tableRate[item],
        count: 1
      };
    } else basketContent[item].count++;
  }
  return basketContent;
};

const getTableData = (cardCost, cardRateTable) => {
  let total = 0,
    bankTotal = 0;
  for (var i = 0; i < cardCost.length; i++) {
    let content, cost, cummulativeCost, cummulativeBankCost;
    if (cardCost[i].cost > 0) {
      total += cardCost[i].cost;
      bankTotal += cardCost[i].basket.length;
      var basketContent = getBasketContent(
        cardCost[i].basket,
        cardRateTable[i]
      );
      content = _.reduce(
        basketContent,
        (str, value, key) => {
          return str + `${value.count} × AL${key + 1} (${value.rate}% each); `;
        },
        ''
      );
    }
  }
};

const FusionRateTable = props => {
  const {
    cardCost,
    fodderCost,
    cardRateTable,
    fodderRateTable,
    fodderBaseAbilityLevel
  } = props;
  const classes = useStyles();

  const getTableData = (cardCost, cardRateTable, includeBankCost) => {
    let total = 0,
      bankTotal = 0;
    const rows = [];
    for (var i = 0; i < cardCost.length; i++) {
      let content, cost, cummulativeCost, cummulativeBankCost;
      const index = `${i + 1} → ${i + 2}`;
      if (cardCost[i].cost > 0) {
        total += cardCost[i].cost;
        bankTotal += cardCost[i].basket.length;
        var basketContent = getBasketContent(
          cardCost[i].basket,
          cardRateTable[i]
        );

        content = _.map(basketContent, (value, key) => {
          return `${value.count} × AL${parseInt(key) + 1} (${
            value.rate
          }% each)`;
        }).join('; ');

        cost = `${cardCost[i].cost} × AL${fodderBaseAbilityLevel} cards`;
        cummulativeCost = `${total} × AL${fodderBaseAbilityLevel} cards`;
        cummulativeBankCost = `${bankTotal} slots`;
      } else {
        cost = cummulativeCost = cummulativeBankCost = 'N/A';
        content = 'Not achievable';
      }
      if (includeBankCost)
        rows.push({
          index,
          content,
          cost,
          cummulativeCost,
          cummulativeBankCost
        });
      else rows.push({ index, content, cost, cummulativeCost });
    }
    return rows;
  };

  const cardTableData = getTableData(cardCost, cardRateTable, true);
  const fodderTableData = getTableData(fodderCost, fodderRateTable, false);
  return (
    <div className={props.className}>
      <Paper className={classes.table}>
        <Typography variant="h6" className={classes.tableTitle}>
          Card fusion table
        </Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Step</TableCell>
              <TableCell>Method</TableCell>
              <TableCell>Cost</TableCell>
              <TableCell>Cummulative cost</TableCell>
              <TableCell>Cummulative bank cost</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cardTableData.map(row => (
              <TableRow key={row.index}>
                {_.map(row, (value, key) => (
                  <TableCell key={key}>{value}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
      <Paper className={classes.table}>
        <Typography variant="h6" className={classes.tableTitle}>
          Fodder fusion table
        </Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Step</TableCell>
              <TableCell>Method</TableCell>
              <TableCell>Cost</TableCell>
              <TableCell>Cummulative cost</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {fodderTableData.map(row => (
              <TableRow key={row.index}>
                {_.map(row, (value, key) => (
                  <TableCell key={key}>{value}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </div>
  );
};

FusionRateTable.propTypes = {
  cardCost: PropTypes.array.isRequired,
  fodderCost: PropTypes.array.isRequired,
  cardRateTable: PropTypes.array.isRequired,
  fodderRateTable: PropTypes.array.isRequired,
  fodderBaseAbilityLevel: PropTypes.number.isRequired
};

export default FusionRateTable;
