import 'dotenv/config';
import app from './app/app.js';
import { prisma } from './lib/prisma.js';

const port = Number(process.env.PORT || 3000);

async function startServer() {
  try {
    await prisma.$connect();
    console.log('Database connection established');

    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`);
    });
  } catch (error) {
    console.error('Failed to connect to the databse', error);
    process.exit(1);
  }
}

startServer();
