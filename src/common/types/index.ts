// Possible task status
export const taskStatuses = ['pending', 'completed', 'failed'] as const;
// Type created with the possible states of the task
export type TaskStatus = (typeof taskStatuses)[number];

export const errorNames = [
  'NOT_FOUND',
  'INTERNAL_ERROR',
  'BAD_REQUEST'
] as const;

export type ErrorNames = typeof errorNames[number];

// HttpError add status to basic Error
export type HttpError = {
  status: number;
} & Error;
