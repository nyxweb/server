import { createConnection } from 'typeorm';

(async () => {
  try {
    await createConnection();

    console.log('Database connected...');
  } catch (error) {
    console.log('Database failed to connect.');
  }
})();
