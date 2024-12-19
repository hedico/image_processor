import { Router } from 'express';
import { getTaskById, processNewTask } from '../controllers/task';

const tasksRouter = Router();

tasksRouter.get('/:taskId', getTaskById);
tasksRouter.post('/', processNewTask);

export default tasksRouter;
