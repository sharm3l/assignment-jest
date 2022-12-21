const {
  getYieldForPlant,
  getYieldForCrop,
  getTotalYield,
  getCostsForCrop,
  getRevenueForCrop,
  getProfitForCrop,
  getTotalProfit,
} = require("./farm");

describe("getYieldForPlant", () => {
  test("Get yield for plant with no environment factors", () => {
    const corn = {
      name: "corn",
      yield: 30,
    };
    expect(getYieldForPlant(corn)).toBe(30);
  });

  test("Get yield for plant with environment factor low sun", () => {
    const corn = {
      name: "corn",
      yield: 30,
      factor: {
        sun: {
          low: -50,
          medium: 0,
          high: 50,
        },
      },
    };
    const environment = {
      sun: "low",
    };
    expect(getYieldForPlant(corn, environment)).toBe(15);
  });

  test("Get yield for plant with environment factor low sun and medium wind", () => {
    const corn = {
      name: "corn",
      yield: 30,
      factor: {
        sun: {
          low: -50,
          medium: 0,
          high: 50,
        },
        wind: {
          low: 0,
          medium: -30,
          high: -60,
        },
      },
    };
    const environment = {
      sun: "low",
      wind: "medium",
    };
    expect(getYieldForPlant(corn, environment)).toBe(10.5);
  });

  test("Get yield for plant with environment factor low sun and medium wind and bogus other environment", () => {
    const corn = {
      name: "corn",
      yield: 30,
      factor: {
        sun: {
          low: -50,
          medium: 0,
          high: 50,
        },
        wind: {
          low: 0,
          medium: -30,
          high: -60,
        },
      },
    };
    const environment = {
      sun: "low",
      wind: "medium",
      bogus: "medium",
    };
    expect(getYieldForPlant(corn, environment)).toBe(10.5);
  });
});

describe("getYieldForCrop", () => {
  test("Get yield for crop, simple", () => {
    const corn = {
      name: "corn",
      yield: 3,
    };
    const input = {
      crop: corn,
      numCrops: 10,
    };
    expect(getYieldForCrop(input)).toBe(30);
  });

  test("Get yield for crop, with environment not so sunny", () => {
    const corn = {
      name: "corn",
      yield: 3,
      factor: {
        sun: {
          low: -50,
          medium: 0,
          high: 50,
        },
      },
    };
    const input = {
      crop: corn,
      numCrops: 10,
    };
    const environment = {
      sun: "low",
    };
    expect(getYieldForCrop(input, environment)).toBe(15);
  });

  test("Get yield for crop, with environment lots of sun", () => {
    const corn = {
      name: "corn",
      yield: 3,
      factor: {
        sun: {
          low: -50,
          medium: 0,
          high: 50,
        },
      },
    };
    const input = {
      crop: corn,
      numCrops: 10,
    };
    const environment = {
      sun: "high",
    };
    expect(getYieldForCrop(input, environment)).toBe(45);
  });
});

describe("getTotalYield", () => {
  test("Calculate total yield with multiple crops, simple", () => {
    const corn = {
      name: "corn",
      yield: 3,
    };
    const pumpkin = {
      name: "pumpkin",
      yield: 4,
    };
    const crops = [
      { crop: corn, numCrops: 5 },
      { crop: pumpkin, numCrops: 2 },
    ];
    expect(getTotalYield({ crops })).toBe(23);
  });

  test("Calculate total yield with 0 amount, simple", () => {
    const corn = {
      name: "corn",
      yield: 3,
    };
    const crops = [{ crop: corn, numCrops: 0 }];
    expect(getTotalYield({ crops })).toBe(0);
  });

  test("Calculate total yield with multiple crops, with environment", () => {
    const corn = {
      name: "corn",
      yield: 3,
      factor: {
        sun: {
          low: -50,
          medium: 0,
          high: 50,
        },
      },
    };
    const pumpkin = {
      name: "pumpkin",
      yield: 4,
      factor: {
        sun: {
          low: -50,
          medium: 0,
          high: 50,
        },
      },
    };
    const crops = [
      { crop: corn, numCrops: 5 },
      { crop: pumpkin, numCrops: 2 },
    ];

    const environment = {
      sun: "high",
    };
    expect(getTotalYield({ crops }, environment)).toBe(34.5);
  });
});

describe("getCostsForCrop", () => {
  test("Get costs for crop, simple", () => {
    const corn = {
      name: "corn",
      yield: 3,
    };
    const input = {
      crop: corn,
      numCrops: 10,
    };
    expect(getCostsForCrop(input)).toBe(10);
  });
});

describe("getRevenueForCrop", () => {
  test("Get revenue for crop, simple", () => {
    const corn = {
      name: "corn",
      yield: 3,
    };
    const input = {
      crop: corn,
      numCrops: 10,
    };
    expect(getRevenueForCrop(input)).toBe(60);
  });

  test("Get revenue for crop, with environment", () => {
    const corn = {
      name: "corn",
      yield: 3,
      factor: {
        sun: {
          low: -50,
          medium: 0,
          high: 50,
        },
      },
    };
    const input = {
      crop: corn,
      numCrops: 10,
    };
    const environment = {
      sun: "high",
    };
    expect(getRevenueForCrop(input, environment)).toBe(90);
  });
});

describe("getProfitForCrop", () => {
  test("Get profit for crop, simple", () => {
    const corn = {
      name: "corn",
      yield: 3,
    };
    const input = {
      crop: corn,
      numCrops: 10,
    };
    expect(getProfitForCrop(input)).toBe(50);
  });

  test("Get profit for crop, with environment", () => {
    const corn = {
      name: "corn",
      yield: 3,
      factor: {
        sun: {
          low: -50,
          medium: 0,
          high: 50,
        },
      },
    };
    const input = {
      crop: corn,
      numCrops: 10,
    };
    const environment = {
      sun: "high",
    };
    expect(getProfitForCrop(input, environment)).toBe(80);
  });
});

describe("getTotalProfit", () => {
  test("Calculate total yield with multiple crops, simple", () => {
    const corn = {
      name: "corn",
      yield: 3,
    };
    const pumpkin = {
      name: "pumpkin",
      yield: 4,
    };
    const crops = [
      { crop: corn, numCrops: 5 },
      { crop: pumpkin, numCrops: 2 },
    ];
    expect(getTotalProfit({ crops })).toBe(39);
  });

  test("Calculate total yield with 0 amount, simple", () => {
    const corn = {
      name: "corn",
      yield: 3,
    };
    const crops = [{ crop: corn, numCrops: 0 }];
    expect(getTotalProfit({ crops })).toBe(0);
  });

  test("Calculate total yield with multiple crops, with environment", () => {
    const corn = {
      name: "corn",
      yield: 3,
      factor: {
        sun: {
          low: -50,
          medium: 0,
          high: 50,
        },
        wind: {
          low: 0,
          medium: -30,
          high: -60,
        },
      },
    };
    const pumpkin = {
      name: "pumpkin",
      yield: 4,
      factor: {
        sun: {
          low: -50,
          medium: 0,
          high: 50,
        },
      },
    };
    const crops = [
      { crop: corn, numCrops: 5 },
      { crop: pumpkin, numCrops: 2 },
    ];

    const environment = {
      sun: "high",
      wind: "medium",
    };
    expect(getTotalProfit({ crops }, environment)).toBe(48.5);
  });
});
