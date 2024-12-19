// Possible task status
export const taskStatus = ['pending', 'completed', 'failed'] as const;
// Type created with the possible states of the task
export type TaskStatus = (typeof taskStatus)[number];
