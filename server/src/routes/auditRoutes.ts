// Audit routes
import { Router } from 'express';
import { getAudit, createAudit, updateAudit, deleteAudit } from '../controllers/auditController';

const router = Router();

router.get('/', getAudit);
router.post('/', createAudit);
router.put('/:id', updateAudit);
router.delete('/:id', deleteAudit);

export default router;
