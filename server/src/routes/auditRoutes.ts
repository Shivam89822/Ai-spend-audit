import express from "express";

import {
  runAuditController,
  getAuditByShareIdController,
} from "../controllers/auditController";

const router = express.Router();

router.post("/run", runAuditController);

router.get("/:shareId", getAuditByShareIdController);

export default router;