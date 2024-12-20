// Possible task status
export const taskStatuses = ['pending', 'completed', 'failed'] as const;
// Type created with the possible states of the task
export type TaskStatus = (typeof taskStatuses)[number];

// HttpError add status to basic Error
export type HttpError = {
  status: number;
} & Error;
