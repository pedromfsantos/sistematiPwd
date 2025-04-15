import express from 'express';

import { getEspecialidades, createEspecialidade, getEspecialidade, deleteEspecialidade, updateEspecialidade } from '../controllers/especialidades.js';

const router = express.Router();

router.get('/', getEspecialidades);

router.post('/', createEspecialidade);

router.get('/:id', getEspecialidade);

router.delete('/:id', deleteEspecialidade);

router.patch('/:id', updateEspecialidade);

export default router;