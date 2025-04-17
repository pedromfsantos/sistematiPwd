import express from 'express';

import { getUserPorCpf , getUsers, insereOuGetUserUsingCPF} from '../controllers/usuarios.js';

const router = express.Router({mergeParams: true});

router.get('/:cpf', getUserPorCpf);
router.get('/', getUsers);
router.post('/:cpf', insereOuGetUserUsingCPF)
export default router;