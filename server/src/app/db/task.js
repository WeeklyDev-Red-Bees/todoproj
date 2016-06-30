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
  priority: {
    type: String,
    enum: ['high', 'moderate', 'low'],
    default: 'moderate'
  },
  color: {
    type: String,
    enum: [
      'red',
      'yellow',
      'orange',
      'green',
      'blue',
      'purple'
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

taskSchema.post('save', function(doc, next) {
  let userID = doc.user;
  // if (typeof doc.user === "string") {
  //   userID = doc.user;
  // } else {
  //   userID = doc.user._id;
  // }
  console.log(userID);
  console.log(typeof doc.user);
  User.findOneAndUpdate({ '_id': userID }, {
    "$push": {
      "tasks": doc
    }
  }).then((user) => {
    console.log('user with new task:', user);
    next();
  });
});

export const Task = mongoose.model('Task', taskSchema);