import { Router } from 'express';

class AuthRoutes {
  constructor(passport) {
    this.passport = passport;
    this.unprotectedRoutes();
    this.protectedRoutes();
  }
  
  unprotectedRoutes() {
    let router = Router();
    
    // router.get('/facebook', this.passport.authenticate('facebook', { scope: 'email', session: false }));
    
    // router.get('/twitter', this.passport.authenticate('twitter', { session: false }));
    
    this.unprotected = router;
  }
  
  protectedRoutes() {
    let router = Router();
    
    
    
    this.protected = router;
  }
}

export function makeAuthRoutes(passport) {
  return new AuthRoutes(passport);
}
