import express from 'express';

import { getConsultaPorIdPaciente} from '../controllers/consultas.js';

const router = express.Router({mergeParams: true});

router.get('/:idPaciente', getConsultaPorIdPaciente);

export default router;