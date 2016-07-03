import { Router } from 'express';
import jwt from 'jsonwebtoken';
import config from 'config';
import { User, Task } from '../db';

export class UserRoutes {
  constructor(passport) {
    this.passport = passport;
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
              let token = jwt.sign({ id: user._id }, config.get('secrets.jwt'));
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
                let token = jwt.sign({ id: newUser._id }, config.get('secrets.jwt'));
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
    
    // router.post('/tasks', (req, res) => {
    //   // console.log(req.body);
    //   User.findById(req.user)
    //     .catch((err) => res.json({ success: false, err }))
    //     .then((user) => {
    //       let task = new Task({
    //         title: req.body.title,
    //         desc: req.body.desc,
    //         priority: req.body.priority,
    //         color: req.body.color,
    //         user: req.user
    //       });
          
    //       task.save()
    //         .catch((err) => res.json({ success: false, err }))
    //         .then((_task) => {
    //           res.json({ success: true, task: _task });
    //         });
    //     });
    // });
    
    this.protected = router;
  }
}

export function makeUserRoutes(passport) {
  return new UserRoutes(passport);
}
