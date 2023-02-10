import mongoose from 'mongoose'

interface User {
    discordId: String,
    acessToken: String,
    refreshToken: String
}

let schema = new mongoose.Schema<User>({
    discordId: {
        type: String,
        required: true,
        unique: true
    },
    acessToken: {
        type: String,
        required: true
    },
    refreshToken: {
        type: String,
        required: true
    }
});

export default mongoose.model('Users', schema)