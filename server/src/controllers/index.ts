import { RequestHandler } from "express";
import passport from "passport";

export const loginUser: RequestHandler = (req, res, next) => {
    passport.authenticate('local', function(err, user, info) {
        if (err) { return res.json(err); }
        if (!user) { 
            return res.json({ type: "error", message: "Zła nazwa użytkownika lub hasło" }); 
        }
        req.logIn(user, function(err) {
          if (err) { return next(err); }
          return res.json(user);
        });
      })(req, res, next);
}

export const logoutUser: RequestHandler = (req, res, next) => {
    req.logout();
    res.json("Succesfully logout the user")
}