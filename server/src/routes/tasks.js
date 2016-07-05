import { Router } from 'express';
import { User, Task } from '../db';

export class TaskRoutes {
  constructor() {
    let router = Router();
    router.get('/debug', (req, res) => {
      Task.find()
        .catch((err) => res.json({ success: false, err }))
        .then((tasks) => {
          res.json({ success: true, tasks });
        });
    });
    this.unprotected = router;
    this.protectedRoutes();
  }
  
  protectedRoutes() {
    let router = Router();
    router.get('/', (req, res) => {
      User.findById(req.user._id).populate('tasks')
        .catch((err) => res.json({ success: false, err }))
        .then((user) => {
          res.json({ success: true, user });
        });
    });
    
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
          User.findByIdAndUpdate(_task.user, {
            "$push": {
              "tasks": _task
            }
          }, { new: true }).populate('tasks').catch((err) => res.json({ success: false, err }))
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
                User.findById(task.user).populate('tasks')
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
      if (req.user.tasks.indexOf(req.params.id) !== -1) {
        // Task.findById(req.params.id).populate('user')
        //   .catch((err) => res.json({ success: false, err }))
        //   .then((task) => {
        //     console.log('found task:', task);
        //     console.log('task user:', task.user);
        //     console.log(task.user._id === req.user._id);
        //     User.findByIdAndUpdate(req.user._id, {
        //       '$pull': {
        //         tasks: {
        //           '_id': req.params.id
        //         }
        //       }
        //     }, { new: true }).populate('tasks')
        //       .catch((err) => res.json({ success: false, err }))
        //       .then((user) => {
        //         task.remove()
        //           .catch((err) => res.json({ success: false, err }))
        //           .then((noTask) => {
        //             console.log('deleted task:', noTask);
        //             res.json({ success: true, user });
        //           });
        //       });
        //   });
        Task.findById(req.params.id).populate('user')
          .catch((err) => res.json({ success: false, err }))
          .then((_task) => {
            console.log('found task:', _task);
            _task.remove()
              .catch((err) => res.json({ success: false, err }))
              .then((task) => {
                console.log('removed task:', task);
                User.findById(req.user._id).populate('tasks')
                  .catch((err) => res.json({ success: false, err }))
                  .then((user) => {
                    console.log('user:', user);
                    res.json({ success: true, user });
                  });
              });
          });
      } else {
        console.log('req param:', req.params.id);
        console.log('user tasks:', req.user.tasks);
      }
      // Task.findById(req.params.id)
      //   .catch((err) => res.json({ success: false, err }))
      //   .then((task) => {
      //     console.log('found task:', task);
      //     if (task.user === req.user._id) {
      //       Task.findByIdAndRemove(req.params.id)
      //         .catch((err) => res.json({ success: false, err }))
      //         .then((noTask) => {
      //           console.log('removed task:', noTask);
      //           User.findByIdAndUpdate(req.user._id, {
      //             '$pull': {
      //               tasks: {
      //                 '_id': req.params.id
      //               }
      //             }
      //           }, { new: true })
      //             .catch((err) => res.json({ success: false, err }))
      //             .then((user) => {
      //               console.log('updated user:', user);
      //               res.json({ success: false, user });
      //             });
      //         });
      //     }
      //   });
    });
    
    this.protected = router;
  }
}