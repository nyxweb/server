import { createConnection } from 'typeorm';

import Character from './entity/Character';
import MEMB_STAT from './entity/MEMB_STAT';
import MEMB_INFO from './entity/MEMB_INFO';

(async () => {
  try {
    await createConnection({
      type: 'mssql',
      url: process.env.TYPEORM_URL,
      entities: [Character, MEMB_STAT, MEMB_INFO],
      // migrations: ['../migrations/*.ts'],
      logging: true
    });

    console.log('Database connected...');
  } catch (error) {
    console.log('DB Failed: ', error.message);
  }
})();
