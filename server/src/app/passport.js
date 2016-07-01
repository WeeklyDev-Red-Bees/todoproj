import config from 'config';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as FacebookStrategy } from 'passport-facebook';
import { Strategy as TwitterStrategy } from 'passport-twitter';
// import { Strategy as GoogleStrategy } from 'passport-google-oauth';
// import { OAuth2Strategy as GitHubStrategy } from 'passport-github';

import { User } from './db';

class PassportConfig {
  constructor(passport) {
    this.passport = passport;
    
    this.configLocal();
    // this.configFacebook();
    this.configTwitter();
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
              email,
              password
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
      console.log('email:', email);
      User.findOne({ email })
        .catch((err) => done(err, false))
        .then((user) => {
          if (!user) {
            return done(null, false);
          } else {
            if (!user.validPassword(password)) {
              // return done(new Error("Invalid password."), false);
              return done(null, false);
            } else {
              return done(null, user);
            }
          }
        });
    }));
  }
  
  configFacebook() {
    let opts = config.get('auth.facebook');
    // opts.session = false;
    opts.passReqToCallback = true;
    opts.enableProof = true;
    this.passport.use(new FacebookStrategy(opts, (req, token, refreshToken, profile, done) => {
      console.log('profile:', profile);
      console.log('token:', token);
      User.findOne({ 'facebook.id': profile.id })
        .catch((err) => done(err, false))
        .then((user) => {
          if (user) {
            return done(null, user);
          } else {
            user = new User({
              facebook: {
                id: profile.id,
                token: token,
                name: profile.displayName
              },
              provider: 'facebook'
            });
            
            // console.log('ugh');
            // console.log(user);
            // console.log('user:', user.validateSync());
            user.save()
              .catch((err) => done(err, false))
              .then((newUser) => {
                console.log('new user:', newUser);
                return done(null, newUser);
              });
          }
        });
    }));
  }
  
  configTwitter() {
    let opts = config.get('auth.twitter');
    opts.passReqToCallback = true;
    
    this.passport.use(new TwitterStrategy(opts, (req, token, tokenSecret, profile, done) => {
      console.log('token:', token);
      console.log('profile:', profile);
      User.findOne({ 'twitter.id': profile.id })
        .catch((err) => done(err, false))
        .then((user) => {
          if (user) {
            return done(null, user);
          } else {
            user = new User({
              twitter: {
                id: profile.id,
                token,
                displayName: profile.displayName,
                username: profile.username
              }
            });
            
            user.save()
              .catch((err) => done(err, false))
              .then((newUser) => {
                console.log('new user:', newUser);
                return done(null, newUser);
              });
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