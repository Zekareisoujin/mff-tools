export default function fusionCalc(params, notGreedy = false) {
  const {
    crossRateTable,
    fodderRateTable,
    cardLevel,
    cardRate,
    fodderLevel,
    fodderRate,
    slotCount,
    minFodderLevel
  } = params;

  var fodderCost = new Array(minFodderLevel).fill(1),
    fodderFusionTable = [],
    cardFusionTable = [];

  // greedy approach
  const fillSlot = (targetLevel, slot, rate, rateTable) => {
    var idx = targetLevel - 1;
    var fodderStart = Math.min(rateTable[idx].length, minFodderLevel);
    var fodderEnd = Math.min(rateTable[idx].length, fodderCost.length);
    var minBasket = { cost: -1, basket: [] };

    var start = notGreedy ? fodderEnd - 1 : fodderStart - 1;

    for (var i = start; i < fodderEnd; i++) {
      var rateLeft = rate - rateTable[idx][i];
      if (rateLeft <= 0) {
        if (
          minBasket.cost < 0 ||
          minBasket.cost > fodderCost[i] ||
          (minBasket.cost == fodderCost[i] && minBasket.basket.length > 1)
        )
          return { cost: fodderCost[i], basket: [i] };
        else return minBasket;
      } else if (slot - 1 > 0) {
        var more = fillSlot(targetLevel, slot - 1, rateLeft, rateTable);
        if (
          more.cost > 0 &&
          (minBasket.cost < 0 ||
            minBasket.cost > more.cost + fodderCost[i] ||
            (minBasket.cost == more.cost + fodderCost[i] &&
              minBasket.basket.length > more.basket.length + 1))
        ) {
          more.cost += fodderCost[i];
          more.basket.push(i);
          minBasket = more;
        }
      }
    }

    return minBasket;
  };

  for (var i = minFodderLevel; i < fodderLevel; i++) {
    var set = fillSlot(i, 5, fodderRate, fodderRateTable);
    fodderFusionTable.push(set);
    fodderCost[i] = fodderCost[i - 1];
    for (var j = 0; j < set.basket.length; j++) {
      fodderCost[i] += fodderCost[set.basket[j]];
    }
  }

  for (var i = 1; i < cardLevel; i++) {
    var data = fillSlot(i, slotCount, cardRate, crossRateTable);
    cardFusionTable.push(data);
  }

  return { cardCost: cardFusionTable, fodderCost: fodderFusionTable };
}
