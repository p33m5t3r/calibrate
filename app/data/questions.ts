export type Answer = {
  exp: number;
  coeff: number;
};

export type Category =
  | "money"
  | "life-and-death"
  | "energy-and-climate"
  | "compute"
  | "deep-time-and-space";

export const categoryLabels: Record<Category, string> = {
  "money": "Money & Wealth",
  "life-and-death": "Life & Death",
  "energy-and-climate": "Energy & Climate",
  "compute": "Compute & Intelligence",
  "deep-time-and-space": "Deep Time & Space",
};

export type Question = {
  id: number;
  displayText: string;
  category: string;
  unit: string;
  clarification?: string;
  source?: string;
} & Answer;

export const questions: Question[] = [
  // === MONEY & WEALTH ===
  {
    id: 0,
    displayText: "World GDP per capita (2025)",
    category: "money",
    unit: "USD",
    coeff: 1.3,
    exp: 4, // $13,000
  },
  {
    id: 1,
    displayText: "World GDP per capita (1800)",
    category: "money",
    unit: "USD",
    clarification: "In 2025 USD (inflation-adjusted)",
    coeff: 1.0,
    exp: 3, // $1,000
  },
  {
    id: 2,
    displayText: "US federal budget (2025)",
    category: "money",
    unit: "USD",
    coeff: 6.5,
    exp: 12, // $6.5 trillion
  },
  {
    id: 3,
    displayText: "S&P 500 total market cap",
    category: "money",
    unit: "USD",
    coeff: 5.0,
    exp: 13, // $50 trillion
  },
  {
    id: 4,
    displayText: "Median individual income, globally",
    category: "money",
    unit: "USD per year",
    clarification: "Nominal USD, not adjusted for local purchasing power",
    coeff: 3.0,
    exp: 3, // $3,000
  },

  // === LIFE & DEATH ===
  {
    id: 5,
    displayText: "Annual births globally",
    category: "life-and-death",
    unit: "births per year",
    coeff: 1.4,
    exp: 8, // 140 million
  },
  {
    id: 6,
    displayText: "World population in 1800",
    category: "life-and-death",
    unit: "people",
    coeff: 1.0,
    exp: 9, // 1 billion
  },
  {
    id: 7,
    displayText: "Total humans ever born",
    category: "life-and-death",
    unit: "people",
    clarification: "Since anatomically modern humans",
    coeff: 1.0,
    exp: 11, // 100 billion
  },
  {
    id: 8,
    displayText: "Number of deaths in World War 2",
    category: "life-and-death",
    unit: "deaths",
    clarification: "Military and civilian combined",
    coeff: 7.0,
    exp: 7, // 70 million
  },
  {
    id: 9,
    displayText: "Annual global deaths from air pollution",
    category: "life-and-death",
    unit: "deaths per year",
    coeff: 7.0,
    exp: 6, // 7 million
  },

  // === ENERGY & CLIMATE ===
  {
    id: 10,
    displayText: "Global annual CO₂ emissions",
    category: "energy-and-climate",
    unit: "metric tons",
    coeff: 4.0,
    exp: 10, // 40 billion tons
  },
  {
    id: 11,
    displayText: "Global annual energy consumption",
    category: "energy-and-climate",
    unit: "kWh",
    clarification: "A typical US home uses ~10,000 kWh/year",
    coeff: 1.8,
    exp: 14, // 180 trillion kWh
  },
  {
    id: 12,
    displayText: "Annual global oil consumption",
    category: "energy-and-climate",
    unit: "barrels",
    clarification: "A barrel is 42 US gallons / 159 liters",
    coeff: 3.5,
    exp: 10, // 35 billion barrels
  },

  // === COMPUTE & INTELLIGENCE ===
  {
    id: 13,
    displayText: "Number of neurons in the human brain",
    category: "compute",
    unit: "neurons",
    coeff: 8.6,
    exp: 10, // 86 billion
  },
  {
    id: 14,
    displayText: "Number of transistors in a modern iPhone",
    category: "compute",
    unit: "transistors",
    clarification: "Based on A18 chip (iPhone 16)",
    coeff: 1.5,
    exp: 10, // 15 billion
  },
  {
    id: 15,
    displayText: "Cost to train GPT-4",
    category: "compute",
    unit: "USD",
    clarification: "Compute cost only, not research/staff",
    coeff: 1.0,
    exp: 8, // $100 million
  },

  // === DEEP TIME & SPACE ===
  {
    id: 16,
    displayText: "Age of the Earth",
    category: "deep-time-and-space",
    unit: "years",
    coeff: 4.5,
    exp: 9, // 4.5 billion years
  },
  {
    id: 17,
    displayText: "Years since earliest known stone tools",
    category: "deep-time-and-space",
    unit: "years",
    clarification: "Oldest known (Lomekwi, Kenya)",
    coeff: 3.3,
    exp: 6, // 3.3 million years
  },
  {
    id: 18,
    displayText: "Distance from Earth to the Sun",
    category: "deep-time-and-space",
    unit: "km",
    coeff: 1.5,
    exp: 8, // 150 million km
  },
  {
    id: 19,
    displayText: "Speed of light",
    category: "deep-time-and-space",
    unit: "m/s",
    coeff: 3.0,
    exp: 8, // 300,000,000 m/s
  },
];
