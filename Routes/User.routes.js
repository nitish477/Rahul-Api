import express from 'express';
import { createMember, getAllUsers, loginMember, updateUser, deleteUser } from './../controller/user.controller.js';


const router = express.Router();

router.post('/create', createMember);
router.get('/', getAllUsers);
router.post('/login', loginMember);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

export default router;
