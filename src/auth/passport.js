import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import { ACCESS_TOKEN_SECRET } from "config/environment";
import bcrypt from "bcrypt";
import { UserService } from "services/UserService";

export const initPassport = () => {
  passport.use(
    new LocalStrategy(
      {
        usernameField: "email",
      },
      async (email, password, done) => {
        try {
          const user = await UserService.find({ email });

          if (!user) return done(null, false);
          let verifyPassword = await bcrypt.compare(password, user.password);
          if (!verifyPassword) return done(null, false);
          done(null, user);
        } catch (error) {
          done(error, false);
        }
      }
    )
  );

  passport.use(
    new JwtStrategy(
      {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken("Authorization"),
        secretOrKey: ACCESS_TOKEN_SECRET,
      },
      async (payload, done) => {
        try {
          const user = await UserService.find({ email: payload.email });

          if (!user) return done(null, false);

          done(null, user);
        } catch (error) {
          done(error, false);
        }
      }
    )
  );
};
