import { Router } from 'express';
import { User, Task } from '../db';

export class TaskRoutes {
  constructor(passport) {
    this.unprotected = Router();
    this.protectedRoutes();
  }
  
  protectedRoutes() {
    let router = Router();
    
    router.post('/', (req, res) => {
      let task = new Task({
        title: req.body.title,
        desc: req.body.desc,
        color: req.body.color,
        user: req.user._id
      });
      
      task.save()
        .catch((err) => res.json({ success: false, err }))
        .then((_task) => {
          // res.json({ success: true, task: _task });
          User.findOneAndUpdate({ '_id': _task.user }, {
            "$push": {
              "tasks": _task
            }
          }).catch((err) => res.json({ success: false, err }))
            .then((user) => res.json({ success: true, user }));
        });
    });
    
    router.put('/:id', (req, res) => {
      Task.findById(req.params.id)
        .catch((err) => res.json({ success: false, err }))
        .then((_task) => {
          let changed = false;
          if (req.body.title) {
            _task.title = req.body.title;
            changed = true;
          }
          if (req.body.desc) {
            _task.desc = req.body.desc;
            changed = true;
          }
          if (req.body.color) {
            _task.color = req.body.color;
            changed = true;
          }
          if (req.body.completed) {
            _task.completed = req.body.completed;
            changed = true;
          }
          if (changed) {
            _task.save()
              .catch((err) => res.json({ success: false, err }))
              // .then((task) => res.json({ success: true, task }));
              .then((task) => {
                User.findById(task.user)
                  .catch((err) => res.json({ success: false, err }))
                  .then((user) => {
                    res.json({ success: true, user });
                  });
              });
          } else {
            res.json({ success: false, err: "ENOCHANGE" });
          }
        });
    });
    
    router.delete('/:id', (req, res) => {
      Task.findById(req.params.id)
        .catch((err) => res.json({ success: false, err }))
        .then((task) => {
          User.update({ '_id': task.user }, {
            '$pull': {
              tasks: {
                '_id': req.params.id
              }
            }
          }).catch((err) => res.json({ success: false, err }))
            .then((user) => {
              task.remove()
                .catch((err) => res.json({ success: false, err }))
                .then((noTask) => {
                  res.json({ success: true, user });
                });
            });
        });
    });
    
    this.protected = router;
  }
}