/**
 * 
 * npx npm test --watchAll
 * 
 * 
    "crop" is a collection of plants of the same species, so for example a field of corn.
    "costs" is the cost of sowing one plant.
    "yield" is the yield of one plant or one crop (in kilograms).
    "sale price" is the selling price of a type of fruit or vegetable per kilo.
    "revenue" is the turnover or income of one kilo of fruit or vegetables.
    "profits" is profit, so that is revenue - costs.
    "factor" in this context is an environmental factor that influences the yield.
 */

const getYieldForPlant = (plant, environment) => {
  const start = plant.yield;

  // when no environment is given we keep it simple
  if (!environment) {
    return start;
  }

  // find all given environment keys
  return Object.keys(environment).reduce((acc, key) => {
    // get the value of the specific environment and look up its factor in the plant info given
    return (acc * (100 + plant.factor[key][environment[key]])) / 100;
    // start with our yield to begin with
  }, start);
};

const getYieldForCrop = (input, environment) => {
  const start = input.crop.yield * input.numCrops;

  // when no environment is given we keep it simple
  if (!environment) {
    return start;
  }

  // find all given environment keys
  return Object.keys(environment).reduce((acc, key) => {
    // get the value of the specific environment and look up its factor in the plant info given
    return (acc * (100 + input.crop.factor[key][environment[key]])) / 100;
    // start with our yield to begin with
  }, start);
};

const getTotalYield = (inputs) => {
  const { crops } = inputs;

  return crops.reduce((acc, item) => {
    acc = acc + getYieldForCrop(item);

    return acc;
  }, 0);
};

const getCostsForCrop = (input) => {
  return input.numCrops * 1;
};

const getRevenueForCrop = (input) => {
  return getYieldForCrop(input) * 2;
};

const getProfitForCrop = (input) => {
  return getRevenueForCrop(input) - getCostsForCrop(input);
};

const getTotalProfit = (inputs) => {
  const { crops } = inputs;

  return crops.reduce((acc, item) => {
    acc = acc + getProfitForCrop(item);

    return acc;
  }, 0);
};

module.exports = {
  getYieldForPlant,
  getYieldForCrop,
  getTotalYield,
  getCostsForCrop,
  getRevenueForCrop,
  getProfitForCrop,
  getTotalProfit,
};
