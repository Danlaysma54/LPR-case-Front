export const getAllAutomationStatusesMock = async () => {
  const statuses = await fetch(
    "src/entites/AutomationStatus/mock-data/mock.json",
  );
  return statuses.json();
};
