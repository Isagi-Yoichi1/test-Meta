import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

// Improved Prisma client handling
let prisma: import("@prisma/client").PrismaClient;

const initPrisma = async () => {
  if (!prisma) {
    const { PrismaClient } = await import("@prisma/client");
    prisma = new PrismaClient();
    await prisma.$connect(); // Explicit connection
  }
  return prisma;
};

app.get("/", async (req, res) => {
  try {
    const prisma = await initPrisma();
    res.send("HTTP Server is running!");
  } catch (error: any) {
    res.status(500).send(`Prisma Client Error: ${error.message}`);
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
