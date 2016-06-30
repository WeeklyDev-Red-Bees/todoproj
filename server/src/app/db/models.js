import mongoose from 'mongoose';
// import bcrypt from 'bcrypt';
import bcrypt from 'bcryptjs';

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

const PROVIDER_ENUM = [
  'local',
  'facebook',
  'twitter',
  'google',
  // 'github'
];

// var localSchema = new mongoose.Schema({
//   email: {
//     type: String,
//     match: /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/,
//     required: [true, 'Local provider requires an email.']
//   },
//   password: {
//     type: String,
//     required: [true, 'Local provider requires a password.']
//   }
// });

// var facebookSchema = new mongoose.Schema({
//   id: {
//     type: String,
//     required: [true, 'Facebook provider requires an ID.']
//   },
//   token: {
//     type: String,
//     required: [true, 'Facebook provider requires a token.']
//   },
//   name: {
//     type: String,
//     required: [true, 'Facebook provider requires a name.']
//   }
// });

var userSchema = new mongoose.Schema({
  local: {
    email: {
      type: String,
      match: /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/,
      // required: function() {
      //   let ret = this.provider === 'local' ? !(!(this.local.email)) : true;
      //   console.log('local.email:', ret);
      //   return ret;
      // }
    },
    password: {
      type: String,
      // required: [true, 'Password required.']
      // required: function() {
      //   let ret = this.provider === 'local' ? !(!(this.local.password)) : true;
      //   console.log('local.password:', ret);
      //   return ret;
      // }
    }
  },
  facebook: {
    id: String,
    token: String,
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
  // local: {
  //   type: ObjectId,
  //   ref: 'LocalProvider'
  // },
  // facebook: {
  //   type: ObjectId,
  //   ref: 'FacebookProvider'
  // },
  provider: {
    type: String,
    enum: PROVIDER_ENUM,
    required: [true, "User requires a provider."]
  },
  tasks: [taskSchema]
}, { timestamps: true });

userSchema.pre('validate', function(next) {
  let err;
  switch (this.provider) {
    case "local":
      if (!this.local.email) err = "Local provider requires an email.";
      if (!this.local.password) err = "Local provider requires a password.";
      break;
    // case "facebook":
    //   if (!this.facebook.id) err = "Facebook provider requires an ID.";
    //   if (!this.facebook.token) err = "Facebook provider requires a token.";
    //   if (!this.facebook.name) err = "Facebook provider requires a name.";
    //   break;
    case "twitter":
      if (!this.twitter.id) err = "Twitter provider requires an ID.";
      break;
    default:
      return err = "Other providers have not been implemented."
  }
  
  console.log('validation err:', err);
  if (err) {
    next(new Error(err));
  } else {
    next();
  }
});

userSchema.pre('save', function(next) {
  // console.log(this);
  console.log('pre save:', this);
  // if (this.isModified('local.password') || (this.isNew() && 'local' in this)) {
  if (this.isModified('local.password')) {
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

// export const LocalProvider = mongoose.model('LocalProvider', localSchema);
// export const FacebookProvider = mongoose.model('FacebookProvider', facebookSchema);
export const User = mongoose.model('User', userSchema);