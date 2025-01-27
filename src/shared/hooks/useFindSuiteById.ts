import { useCallback } from "react";
import { SuiteType } from "src/types/UnitsType";

export const useFindSuiteById = (suites: SuiteType[]) => {
  return useCallback(
    (suiteId: string): SuiteType | undefined => {
      const search = (suites: SuiteType[]): SuiteType | undefined => {
        for (const suite of suites) {
          if (suite.suiteId === suiteId) {
            return suite;
          }
          if (suite.children?.suites) {
            const found = search(suite.children.suites);
            if (found) {
              return found;
            }
          }
        }
        return undefined;
      };
      return search(suites);
    },
    [suites],
  );
};
