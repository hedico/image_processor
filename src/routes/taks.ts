import { Router } from 'express';
import { getTaskById, processNewTask } from '../controllers/task';
import upload from '../middlewares/multer';

const tasksRouter = Router();

tasksRouter.get('/:taskId', getTaskById);
tasksRouter.post('/', upload.single('image'), processNewTask);

export default tasksRouter;
