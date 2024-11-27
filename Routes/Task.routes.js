import express from 'express';
import { createTask, getUserTasks, updateTaskStatus } from './../controller/Task.controller.js';


const router = express.Router();

router.post('/create', createTask);
router.get('/:userId', getUserTasks);
router.put('/update', updateTaskStatus);


export default router;
