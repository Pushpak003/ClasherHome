import PDFDocument from "pdfkit";
import path from "path";
import fs from "fs";

export const generatePDF = (townhallName, thData, res) => {
  console.log("📄 PDF generation started for:", townhallName);

  const doc = new PDFDocument({ margin: 30 });
  res.writeHead(200, {
    "Content-Type": "application/pdf",
    "Content-Disposition": `attachment; filename=${townhallName}.pdf`,
  });
  doc.pipe(res);

  // Title
  doc.fontSize(20).text(`Clash of Clans - ${townhallName.toUpperCase()}`, { align: "center" });
  doc.moveDown();

  const thFolder = path.join(process.cwd(), "images", townhallName);

  // Buildings
  doc.fontSize(16).text("Buildings:");
  for (const [name, info] of Object.entries(thData.buildings || {})) {
    if (info.image) {
      const imgPath = path.join(thFolder, info.image);
      if (fs.existsSync(imgPath)) {
        doc.image(imgPath, { width: 50, height: 50 });
      }
    }
    doc.text(`${name}: Level ${info.level}`);
    doc.moveDown(0.5);
  }
  doc.moveDown();

  // Troops
  doc.text("Troops:");
  for (const [name, info] of Object.entries(thData.troops || {})) {
    if (info.level > 0) {
      if (info.image) {
        const imgPath = path.join(thFolder, info.image);
        if (fs.existsSync(imgPath)) {
          doc.image(imgPath, { width: 50, height: 50 });
        }
      }
      doc.text(`${name}: Level ${info.level}`);
      doc.moveDown(0.5);
    }
  }
  doc.moveDown();

  // Heroes
  doc.text("Heroes:");
  for (const [name, info] of Object.entries(thData.heroes || {})) {
    if (info.level > 0) {
      if (info.image) {
        const imgPath = path.join(thFolder, info.image);
        if (fs.existsSync(imgPath)) {
          doc.image(imgPath, { width: 50, height: 50 });
        }
      }
      doc.text(`${name}: Level ${info.level}`);
      doc.moveDown(0.5);
    }
  }

  doc.end();
  console.log("✅ PDF stream ended, sending to client...");
};
