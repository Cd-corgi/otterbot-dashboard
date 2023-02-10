import { config } from 'dotenv';
config();

import express from 'express';
import { createApp } from './utils/createApp';
import './database';
const app = express();

const port = process.env.PORT || 3000;

async function main() {
    try {
        console.clear()
        const app = createApp();
        app.listen(port, () => console.log(`Running server in http://localhost:${port}`))
        console.log(`Running in ${process.env.ENVIRONMENT} mode.`)
    } catch (error) {
        console.log(error)
    }
}

main();