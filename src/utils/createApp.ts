import express, { Express } from 'express'
import cors from 'cors'
import session from 'express-session'
import routes from '../routes'
import passport from 'passport'

export function createApp(): Express {
    require('../strategies/discord');
    const app = express();
    // Enable parsing Middleware for requests
    app.use(express.json());
    app.use(express.text())

    // Enabling CORS
    app.use(cors({ origin: ["http://localhost:3000"], credentials: true, }));
    app.use(session(
        {
            secret: "DiscordDashboardByCorgi",
            resave: false,
            saveUninitialized: false,
            cookie: { maxAge: 60000 * 60 * 24 * 7, },
        })
    )

    // Passport
    app.use(passport.initialize())
    app.use(passport.session())

    app.use("/api", routes);
    return app
}