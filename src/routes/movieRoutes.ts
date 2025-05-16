import { Router } from 'express';
import {getLowerImdbThanTomatoes, getRussianMovies, getActionComedyMovies, getTopAwardedMovies, groupByImdbFor2010} from '../controllers/movieController.js';

export const movieRouter = Router();

movieRouter.get('/lower-imdb', getLowerImdbThanTomatoes);
movieRouter.get('/russian', getRussianMovies);
movieRouter.get('/comedy', getActionComedyMovies);
movieRouter.get('/top', getTopAwardedMovies);
movieRouter.get('/imdb-2010', groupByImdbFor2010);
