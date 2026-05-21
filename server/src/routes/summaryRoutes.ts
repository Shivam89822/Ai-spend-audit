// Summary routes
import { Router } from 'express';
import { getSummary, generateSummary } from '../controllers/summaryController';

const router = Router();

router.get('/:auditId', getSummary);
router.post('/:auditId/generate', generateSummary);

export default router;
