import { Router } from "express";
import { createLead, getLeads, updateLead, deleteLead } from "../controllers/leadController";

const router = Router();

// POST /api/leads - Adds a new lead to the database (uses createLead from leadController)
router.post("/", createLead);
router.get("/", getLeads);
router.put("/:id", updateLead);
router.delete("/:id", deleteLead);

export default router;