export type ColorsMap = {
  [key: string]: string;
};

export const TestCaseStatusColorMap: ColorsMap = {
  Passed: "#28B95E",
  Failed: "#F04B6A",
  Blocked: "#FFC300",
  Skipped: "#B5B5B5",
  Invalid: "#7F13BE",
};

export const TestRunStatusColorMap: ColorsMap = {
  "In progress": "#0860EF",
  End: "#FF9700",
  "Not started": "#747474",
};
