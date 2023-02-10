import passport from 'passport'
import { Profile, Strategy } from 'passport-discord'
import { VerifyCallback } from 'passport-oauth2'
import { User } from '../database/schemas';

passport.serializeUser((user: any, done) => {
    return done(null, user.id)
});

passport.deserializeUser(async (id: String, done) => {
    try {
        const users = await User.findById(id)
        return users ? done(null, users) : done(null, null)
    } catch (error) {
        return done(error, null)
    }
})

passport.use(
    new Strategy({
        clientID: process.env.BOT_ID!,
        clientSecret: process.env.SECRET_CLIENT!,
        callbackURL: process.env.DISCORD_URL_REDIRECT,
        scope: ["identify", "email", "guilds"]
    }, async (
        acessToken: String,
        refreshToken: String,
        profile: Profile,
        done: VerifyCallback
    ) => {
        const { id: discordId } = profile
        try {
            let existsU = await User.findOneAndUpdate({ discordId },
                { acessToken, refreshToken },
                { new: true }
            );
            console.log(`Existing ${existsU}`)
            if (existsU) return done(null, existsU);
            const newUser = new User({
                discordId,
                acessToken,
                refreshToken
            }).save()
            return done(null, newUser)
        } catch (error) {
            console.log(error)
            return done(error as any, undefined)
        }

    }
    )
);