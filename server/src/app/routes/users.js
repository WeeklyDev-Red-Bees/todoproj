import { Router } from 'express';
import jwt from 'jsonwebtoken';
import config from 'config';
import { User, Task } from '../db';

class UserRoutes {
  constructor(passport) {
    this.passport = passport;
    this.unprotectedRoutes();
    this.protectedRoutes();
  }
  
  unprotectedRoutes() {
    let router = Router();
    
    router.post('/auth', (req, res, next) => {
      console.log(req.body);
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
    
    router.get('/', (req, res) => {
      // console.log(req);
      User.findById(req.user).populate('tasks')
        .catch((err) => res.json({ success: false, err }))
        .then((user) => {
          user = user.toObject();
          delete user.password;
          res.json({ success: true, user });
        });
    });
    
    router.post('/tasks', (req, res) => {
      // console.log(req.body);
      User.findById(req.user)
        .catch((err) => res.json({ success: false, err }))
        .then((user) => {
          let task = new Task({
            title: req.body.title,
            desc: req.body.desc,
            priority: req.body.priority,
            color: req.body.color,
            user: req.user
          });
          
          task.save()
            .catch((err) => res.json({ success: false, err }))
            .then((_task) => {
              res.json({ success: true, task: _task });
            });
        });
    });
    
    this.protected = router;
  }
}

export function makeUserRoutes(passport) {
  return new UserRoutes(passport);
}
