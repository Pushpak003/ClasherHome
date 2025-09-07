import express from "express";
import fs from "fs";
import path from "path";
import { generatePDF } from "../services/pdfService.js";

const __dirname = process.cwd();
const dataPath = path.join(__dirname, "data", "data.json");
const data = JSON.parse(fs.readFileSync(dataPath, "utf-8"));


const router = express.Router();

// ✅ GET all Townhall levels
router.get("/", (req, res) => {
  res.json({ availableTownhalls: Object.keys(data) });
});

// ✅ GET specific Townhall data
router.get("/:townhall", (req, res) => {
  const { townhall } = req.params;
  if (data[townhall]) {
    res.json(data[townhall]);
  } else {
    res.status(404).json({ error: "Townhall not found" });
  }
});

// ✅ POST request to generate PDF
router.post("/generate-pdf", (req, res) => {
  const { townhall } = req.body;
  console.log("📩 POST request body:", req.body);

  if (!townhall || !data[townhall]) {
    return res.status(404).json({ error: "Townhall not found in data.json" });
  }

  console.log("✅ Generating PDF for:", townhall);
  generatePDF(townhall, data[townhall], res);
});

export default router;
