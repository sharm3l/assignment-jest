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

const getYieldForPlant = (plant) => {
  return plant.yield;
};

const getYieldForCrop = (input) => {
  return input.crop.yield * input.numCrops;
};

const getTotalYield = (inputs) => {
  const { crops } = inputs;

  return crops.reduce((acc, item) => {
    acc = acc + item.crop.yield * item.numCrops;

    return acc;
  }, 0);
};

module.exports = {
  getYieldForPlant,
  getYieldForCrop,
  getTotalYield,
};
