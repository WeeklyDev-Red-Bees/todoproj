import { Router } from 'express';
import jwt from 'jsonwebtoken';
import config from 'config';
import { User } from '../db';
import { makeUserRoutes } from './users';
// import { makeTaskRoutes } from './tasks';

export function makeRoutes(passport) {
  let router = Router();
  
  let userRoutes = makeUserRoutes(passport);
  // let taskRoutes = makeTaskRoutes();
  router.use('/users', userRoutes.unprotected);
  // router.use('/tasks', taskRoutes.unprotected);
  
  // TODO: Implement JWT authentication
  router.use((req, res, next) => {
    let token = req.body.token || req.query.token || req.headers['x-access-token'];
    
    if (token) {
      jwt.verify(token, config.get('secrets.jwt'), (err, decoded) => {
        if (err) {
          return res.json({ success: false, err });
        } else {
          User.findById(decoded.id)
            .catch((err) => res.json({ success: false, err }))
            .then((user) => {
              req.dec = user;
            });
        }
      });
    }
  });
  
  router.use('/users', userRoutes.protected);
  // router.use('/tasks', taskRoutes.protected);
  
  return router;
}