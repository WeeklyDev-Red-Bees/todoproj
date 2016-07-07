import { Router } from 'express';
import jwt from 'jsonwebtoken';
import config from 'config';
import { User, Task } from '../db';

export class UserRoutes {
  constructor() {
    this.unprotectedRoutes();
    this.protectedRoutes();
  }
  
  unprotectedRoutes() {
    let router = Router();
    
    router.post('/auth', (req, res) => {
      console.log('auth:', req.body);
      User.findOne({ email: req.body.email }).populate('tasks')
        .catch((err) => res.json({ success: false, err }))
        .then((user) => {
          console.log('auth cb');
          if (user) {
            console.log('found user');
            console.log(user);
            if (!user.validPassword(req.body.password)) {
              console.log('invalid pass');
              res.json({ success: false, err: "EPASS" });
            } else {
              console.log('sending token');
              let token = jwt.sign({ id: user._id }, config.get('secrets.jwt'), { expiresIn: '1 hour' });
              res.json({ success: true, token, user: user.toObject() });
            }
          } else {
            console.log('user not found');
            res.json({ success: false, err: "ENOTEXIST" });
          }
        });
    });
    
    router.post('/', (req, res) => {
      console.log('signup:', req.body);
      User.findOne({ email: req.body.email })
        .catch((err) => res.json({ success: false, err }))
        .then((user) => {
          if (user) {
            res.json({ success: false, err: "EEXISTS" });
          } else {
            user = new User({
              email: req.body.email,
              password: req.body.password
            });
            
            user.save()
              .catch((err) => res.json({ success: false, err }))
              .then((newUser) => {
                // res.json({ success: true, user: newUser });
                let token = jwt.sign({ id: newUser._id }, config.get('secrets.jwt'), { expiresIn: '1 hour' });
                res.json({ success: true, token, user: newUser.toObject() });
              });
          }
        });
    });
    
    this.unprotected = router;
  }
  
  protectedRoutes() {
    let router = Router();
    
    router.get('/', (req, res) => {
      // console.log(req);
      User.findById(req.user._id).populate('tasks')
        .catch((err) => res.json({ success: false, err }))
        .then((user) => {
          user = user.toObject();
          delete user.password;
          res.json({ success: true, user });
        });
    });
    
    this.protected = router;
  }
}

export function makeUserRoutes(passport) {
  return new UserRoutes(passport);
}
