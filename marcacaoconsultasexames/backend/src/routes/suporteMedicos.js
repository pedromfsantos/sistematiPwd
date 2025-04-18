import express from 'express';

import { getMedicosPorIdEspecialidade} from '../controllers/medicos.js';

const router = express.Router({mergeParams: true});

router.get('/:idEspecialidade', getMedicosPorIdEspecialidade);

export default router;