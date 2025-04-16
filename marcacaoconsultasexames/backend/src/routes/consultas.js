import express from 'express';

import { getConsultas, createConsulta, getConsulta, deleteConsulta, updateConsulta } from '../controllers/consultas.js';

const router = express.Router();

router.get('/', getConsultas);

router.post('/', createConsulta);

router.get('/:id', getConsulta);

router.delete('/:id', deleteConsulta);

router.patch('/:id', updateConsulta);

export default router;