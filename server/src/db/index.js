import mongoose from 'mongoose';
import config from 'config';

import { User } from './user';

export function initializeDatabase() {
  let dbURI = "mongodb://";
  if (config.has('db.user') && config.has('db.pass')) {
    dbURI += `${config.get('db.user')}:${config.get('db.pass')}@`;
  }
  dbURI += config.get('db.host');
  if (config.has('db.port')) {
    dbURI += ':'+config.get('db.port');
  }
  dbURI += `/${config.get('db.name')}`;
  console.log(`Connecting to MongoDB at: ${dbURI}`);
  mongoose.connect(dbURI, (err) => {
    if (err) {
      console.error(err);
      throw err;
    } else {
      console.log(`Successfully connected to MongoDB.`);
    }
  });
}

export * from './user';
export * from './task';