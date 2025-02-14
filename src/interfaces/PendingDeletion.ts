interface PendingDeletion<T> {
  id: string;
  data: T;
  timerId: number;
}

export default PendingDeletion;
