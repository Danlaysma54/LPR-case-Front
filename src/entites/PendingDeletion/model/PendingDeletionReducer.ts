import { SavePendingDeletionType } from "@/entites/PendingDeletion/model/PendingDeletionActions";
import PendingDeletion from "@/interfaces/PendingDeletion";
import { SuiteType } from "@/types/UnitsType";

export const PENDING_DELETION_REDUCER = "PENDING_DELETION_REDUCER";

export type pendingDeletionState = {
  pendingDeletions: PendingDeletion<SuiteType>[];
  isError: boolean;
};

const initialStateData: pendingDeletionState = {
  pendingDeletions: [],
  isError: false,
};

export function pendingDeletionReducer(
  state: pendingDeletionState = initialStateData,
  action: SavePendingDeletionType,
) {
  switch (action.type) {
    case "SAVE_PENDING_DELETION_SUCCESS":
      return {
        ...state,
        pendingDeletions: action.pendingDeletions,
        isError: false,
      };
    case "SAVE_PENDING_DELETION_REJECT":
      return {
        ...state,
        isError: true,
      };
    case "SAVE_PENDING_DELETION_PENDING":
      return {
        ...state,
        isError: false,
      };
    default:
      return state;
  }
}
