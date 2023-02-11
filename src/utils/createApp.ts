import express, { Express } from 'express'
import cors from 'cors'
import session from 'express-session'
import routes from '../routes'
import passport from 'passport'
import store from 'connect-mongo'

export function createApp(): Express {
    require('../strategies/discord');
    const app = express();
    // Enable parsing Middleware for requests
    app.use(express.json());
    app.use(express.text())

    // Enabling CORS
    app.use(cors({ origin: ["http://localhost:3000"], credentials: true, }));
    // Sessions
    app.use(session(
        {
            secret: "DiscordDashboardByCorgi",
            resave: false,
            saveUninitialized: false,
            cookie: { maxAge: 60000 * 60 * 24 * 7, },
            store: store.create({ mongoUrl: `${process.env.MONGO_URI}` })
        })
    )

    // Passport
    app.use(passport.initialize())
    app.use(passport.session())

    app.use("/api", routes);
    return app
}