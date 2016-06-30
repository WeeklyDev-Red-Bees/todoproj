import mongoose from 'mongoose';
// import bcrypt from 'bcrypt';
import bcrypt from 'bcryptjs';

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
    enum: ['High', 'Moderate', 'Low'],
    default: 'Moderate'
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
  }
}, { timestamps: true });

var userSchema = new mongoose.Schema({
  local: {
    email: {
      type: String,
      match: /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/
    },
    password: {
      type: String,
      required: [true, 'Password required.']
    }
  },
  facebook: {
    id: String,
    token: String,
    email: String,
    name: String
  },
  twitter: {
    id: String,
    token: String,
    displayName: String,
    username: String
  },
  google: {
    id: String,
    token: String,
    email: String,
    name: String
  },
  tasks: [taskSchema]
}, { timestamps: true });

userSchema.pre('save', function(next) {
  if (this.isModified('local.password') || (this.isNew() && 'local' in this)) {
    this.local.password = bcrypt.hash(this.local.password, 10, (err, hash) => {
      if (err) {
        next(err);
      } else {
        this.local.password = hash;
        next();
      }
    });
  }
});

userSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.local.password);
};

export const User = mongoose.model('User', userSchema);