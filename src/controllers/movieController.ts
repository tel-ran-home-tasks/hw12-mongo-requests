import { Request, Response } from 'express';
import Movie from '../model/movieModel.js';

export const getLowerImdbThanTomatoes = async (req: Request, res: Response) => {
    const movies = await Movie.find({
        $expr: { $lt: ['$imdb.rating', '$tomatoes.viewer.rating'] }
    });
    res.json(movies);
};

export const getRussianMovies = async (req: Request, res: Response) => {
    const movies = await Movie.find({ languages: 'Russian' });
    res.json(movies);
};

export const getActionComedyMovies = async (req: Request, res: Response) => {
    const movies = await Movie.find({
        genres: { $all: ['Action', 'Comedy'] }
    });
    res.json(movies);
};

export const getTopAwardedMovies = async (req: Request, res: Response) => {
    const top = await Movie.find({ 'awards.wins': { $exists: true } })
        .sort({ 'awards.wins': -1 })
        .limit(2)
        .select('title awards');
    res.json(top);
};

export const groupByImdbFor2010 = async (req: Request, res: Response) => {
    const grouped = await Movie.aggregate([
        { $match: { year: 2010 } },
        {
            $group: {
                _id: '$imdb.rating',
                titles: { $push: '$title' }
            }
        },
        { $sort: { _id: -1 } }
    ]);
    res.json(grouped);
};
