import { Strategy as LocalStrategy } from 'passport-local';
// import { Strategy as FacebookStrategy } from 'passport-facebook';
// import { Strategy as TwitterStrategy } from 'passport-twitter';
// import { Strategy as GoogleStrategy } from 'passport-google-oauth';
// import { Strategy as GitHubStrategy } from 'passport-github';

import { User } from './db';

class PassportConfig {
  constructor(passport) {
    this.passport = passport;
    
    this.configLocal();
    // this.configFacebook();
    // this.configTwitter();
    // this.configGoogle();
    // this.configGitHub();
  }
  
  configLocal() {
    this.passport.use('local-signup', new LocalStrategy({
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true
    }, (req, email, password, done) => {
      console.log('passport signup');
      console.log('email:', email);
      console.log('password:', password);
      User.findOne({ 'local.email': email })
        .catch((err) => done(err))
        .then((user) => {
          console.log('user:', user);
          if (user) {
            return done(new Error("User already exists."), false);
          } else {
            let newUser = new User({
              local: {
                email,
                password
              }
            });
            console.log(newUser);
            newUser.save()
              .catch((err) => {
                throw err;
              })
              .then((_user) => {
                done(null, _user);
              });
          }
        });
    }));
    
    this.passport.use('local-login', new LocalStrategy({
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true
    }, (req, email, password, done) => {
      User.findOne({ 'local.email': email })
        .catch((err) => done(err))
        .then((user) => {
          if (!user) {
            return done(new Error("User not found."), false);
          } else {
            if (!user.validPassword(password)) {
              return done(new Error("Invalid password."), false);
            } else {
              return done(null, user);
            }
          }
        });
    }));
  }
  
  getPassport() {
    return this.passport;
  }
}

export function configPassport(passport) {
  let passConfig = new PassportConfig(passport);
  return passConfig.getPassport();
}