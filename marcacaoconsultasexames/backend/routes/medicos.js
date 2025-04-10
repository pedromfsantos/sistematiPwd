import express from 'express';

import { getMedicos, createMedico, getMedico, deleteMedico, updateMedico } from '../controllers/medicos.js';

const router = express.Router();

router.get('/', getMedicos);

router.post('/', createMedico);

router.get('/:id', getMedico);

router.delete('/:id', deleteMedico);

router.patch('/:id', updateMedico);

export default router;