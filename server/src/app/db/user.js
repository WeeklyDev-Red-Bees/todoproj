import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const ObjectId = mongoose.Schema.Types.ObjectId;

var userSchema = new mongoose.Schema({
  email: {
    type: String,
    match: /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/,
    required: [true, "Email required."]
  },
  password: {
    type: String,
    required: [true, "Password required."]
  },
  // tasks: [taskSchema],
  tasks: [{
    type: ObjectId,
    ref: 'Task'
  }]
}, { timestamps: true });

userSchema.pre('save', function(next) {
  // console.log(this);
  console.log('pre save:', this);
  // if (this.isModified('local.password') || (this.isNew() && 'local' in this)) {
  if (this.isModified('password')) {
    this.password = bcrypt.hash(this.password, 10, (err, hash) => {
      if (err) {
        next(err);
      } else {
        this.password = hash;
        next();
      }
    });
  }
});

userSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};

export const User = mongoose.model('User', userSchema);