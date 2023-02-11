import mongoose from 'mongoose'

export interface User {
    id: string;
    discordId: string,
    acessToken: string,
    refreshToken: string
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