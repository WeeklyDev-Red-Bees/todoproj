import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import { User } from './user';

const ObjectId = mongoose.Schema.Types.ObjectId;

var taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'A task requires a title.']
  },
  desc: {
    type: String,
    required: [true, 'A task requires a description.']
  },
  // priority: {
  //   type: String,
  //   enum: ['high', 'moderate', 'low'],
  //   default: 'moderate'
  // },
  color: {
    type: String,
    enum: [
      'red',
      // 'yellow',
      'orange',
      'green',
      'blue',
      // 'purple'
    ],
    required: [true, 'A task requires a color.']
  },
  completed: {
    type: Boolean,
    default: false
  },
  user: {
    type: ObjectId,
    ref: 'User'
  }
}, { timestamps: true });

taskSchema.pre('remove', function(next) {
  let tasks = this.user.tasks;
  tasks.splice(tasks.indexOf(this._id), 1);
  this.model('User').findByIdAndUpdate(this.user._id, {
    '$set': {
      tasks
    }
  }).catch((err) => next(err))
    .then((newUser) => {
      console.log('new user:', newUser);
      next();
    });
  // next();
});

// taskSchema.post('save', function(doc, next) {
//   if (doc.isNew()) {
//     let userID = doc.user;
//     console.log(userID);
//     console.log(typeof doc.user);
//     User.findOneAndUpdate({ '_id': userID }, {
//       "$push": {
//         "tasks": doc
//       }
//     }).then((user) => {
//       console.log('user with new task:', user);
//       next();
//     });
//   }
// });

export const Task = mongoose.model('Task', taskSchema);