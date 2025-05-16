import express from 'express';
import { db, PORT } from './config/movieConfig.js';
import { errorHandler } from './errorHandler/errorHandler.js';
import { movieRouter } from './routes/movieRoutes.js'; // или другое имя
import morgan from 'morgan';
import fs from 'fs';
import mongoose from 'mongoose';

export const launchServer = () => {
    //===============Mongo connection================
    mongoose.connect(db)
        .then(() => console.log('MongoDB Connected'))
        .catch((err) => console.log(err));

    //================Server creation===================
    const logStream = fs.createWriteStream('./src/access.log', { flags: 'a' });
    const app = express();
    app.listen(PORT, () => console.log(`Server runs at http://localhost:${PORT}`));

    //===============Middleware====================
    app.use(express.json());
    app.use(morgan('dev'));
    app.use(morgan('combined', { stream: logStream }));

    //===============Router========================
    app.use('/api/movies/', movieRouter);

    //==============ErrorHandler===================
    app.use(errorHandler);
};
