import PendingDeletion from "@/interfaces/PendingDeletion";
import { SuiteType } from "src/types/UnitsType";

enum PendingDeletionType {
  SAVE_PENDING_DELETION_REJECT = "SAVE_PENDING_DELETION_REJECT",
  SAVE_PENDING_DELETION_SUCCESS = "SAVE_PENDING_DELETION_SUCCESS",
  SAVE_PENDING_DELETION_PENDING = "SAVE_PENDING_DELETION_PENDING",
}

export type SavePendingDeletionType = {
  type: PendingDeletionType;
  pendingDeletions: PendingDeletion<SuiteType>[];
};

export function savePendingDeletion(
  elements: PendingDeletion<SuiteType>[],
): SavePendingDeletionType {
  return {
    type: PendingDeletionType.SAVE_PENDING_DELETION_SUCCESS,
    pendingDeletions: elements,
  };
}
