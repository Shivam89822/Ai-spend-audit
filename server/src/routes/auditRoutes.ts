import express from "express";

import { runAuditController } from "../controllers/auditController";

const router = express.Router();

router.post("/run", runAuditController);

export default router;