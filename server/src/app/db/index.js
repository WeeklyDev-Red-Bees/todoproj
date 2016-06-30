import mongoose from 'mongoose';

export function initializeDatabase() {
  let dbURI = `mongodb://${process.env.DB_URI}`;
  // let user = process.env.DB_USER;
  // let pass = process.env.DB_PASS;
  // let host = process.env.DB_HOST;
  // let port = process.env.DB_PORT;
  // let name = process.env.DB_NAME;
  // if (user && pass) {
  //   dbURI += `${user}:${pass}@`;
  // }
  // dbURI += host;
  // if (port) {
  //   dbURI += ':'+port;
  // }
  // dbURI += `/${name}`;
  console.log(`Connecting to MongoDB with: ${dbURI}`);
  mongoose.connect(dbURI);
}

export * from './models';