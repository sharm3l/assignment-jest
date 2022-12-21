/**
 *
 * npx npm test --watchAll
 *
 */

const getYieldForPlant = (plant, environment) => {
  const start = plant.yield;

  // when no environment is given we keep it simple
  if (!environment) {
    return start;
  }

  // find all given environment keys
  return Object.keys(environment).reduce((acc, key) => {
    // a factor for specific crop can be optional, when not there we will take accumulator
    // else we will calculate its percentage in change
    const hasFactor = !!plant.factor[key];

    // get the value of the specific environment and look up its factor in the plant info given
    return !hasFactor
      ? acc
      : (acc * (100 + plant.factor[key][environment[key]])) / 100;
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
    // a factor for specific crop can be optional, when not there we will take accumulator
    // else we will calculate its percentage in change
    const hasFactor = !!input.crop.factor[key];
    // get the value of the specific environment and look up its factor in the plant info given
    return !hasFactor
      ? acc
      : (acc * (100 + input.crop.factor[key][environment[key]])) / 100;
    // start with our yield to begin with
  }, start);
};

const getTotalYield = (inputs, environment) => {
  const { crops } = inputs;

  return crops.reduce((acc, item) => {
    acc = acc + getYieldForCrop(item, environment);

    return acc;
  }, 0);
};

const getCostsForCrop = (input) => {
  return input.numCrops * 1;
};

const getRevenueForCrop = (input, environment) => {
  return getYieldForCrop(input, environment) * 2;
};

const getProfitForCrop = (input, environment) => {
  return getRevenueForCrop(input, environment) - getCostsForCrop(input);
};

const getTotalProfit = (inputs, environment) => {
  const { crops } = inputs;

  return crops.reduce((acc, item) => {
    acc = acc + getProfitForCrop(item, environment);

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
