import express from 'express';

import { getUsers, createUser, getUser, deleteUser, updateUser } from '../controllers/usuarios.js';

const router = express.Router();

router.get('/', getUsers);

router.get('/:id', getUser);

router.post('/', createUser);

router.delete('/:id', deleteUser);

router.patch('/:id', updateUser);

export default router;