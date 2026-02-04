export type Answer = {
  exp: number;
  coeff: number;
};

export type Question = {
  id: number;
  displayText: string;
} & Answer;

export const questions: Question[] = [
  {
    id: 0,
    displayText: "world population (2025)",
    exp: 9,
    coeff: 8.3,
  },
  {
    id: 1,
    displayText: "world GDP (in dollars, 2025)",
    exp: 13,
    coeff: 9.78,
  },
  {
    id: 2,
    displayText: "world GDP (in dollars, 2000)",
    exp: 13,
    coeff: 9.78,
  },
];
