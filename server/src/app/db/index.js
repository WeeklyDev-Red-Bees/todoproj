import mongoose from 'mongoose';
import config from 'config';

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
  console.log(`Connecting to MongoDB with: ${dbURI}`);
  mongoose.connect(dbURI);
}

export * from './user';
export * from './task';