import express from "express";
import townhallRoutes from "./routes/townhallRoutes.js";

const app = express();
app.use(express.json());

// Routes
app.use("/townhall", townhallRoutes);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
