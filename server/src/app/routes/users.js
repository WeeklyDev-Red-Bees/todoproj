import { Router } from 'express';
import jwt from 'jsonwebtoken';
import config from 'config';
import { User } from '../db';

class UserRoutes {
  constructor(passport) {
    this.passport = passport;
    this.unprotectedRoutes();
    this.protectedRoutes();
  }
  
  unprotectedRoutes() {
    let router = Router();
    
    router.post('/auth', (req, res, next) => {
      this.passport.authenticate('local-login', (err, user, info) => {
        if (err) {
          return next(err);
        } else if (!user) {
          return res.json({ success: false, err: "No user." });
        } else {
          let token = jwt.sign({ id: user._id }, config.get('secrets.jwt'));
          res.json({ success: true, token });
        }
      }, { session: false })(req, res, next);
    });
    
    router.post('/', (req, res, next) => {
      this.passport.authenticate('local-signup', (err, user, info) => {
        console.log(user);
        if (err) {
          console.error(err);
          return next(err);
        } else if (!user) {
          console.log('no user');
          return res.json({ success: false, err: "User could not be created." });
        } else {
          console.log('encoding token');
          let token = jwt.sign({ id: user._id }, config.get('secrets.jwt'), {
            expiresIn: '1 day'
          });
          console.log(token);
          res.json({ success: true, token });
        }
      }, { session: false })(req, res, next);
    });
    
    this.unprotected = router;
  }
  
  protectedRoutes() {
    let router = Router();
    
    
    
    this.protected = router;
  }
}

export function makeUserRoutes(passport) {
  return new UserRoutes(passport);
}