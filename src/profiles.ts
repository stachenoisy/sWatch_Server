import { Elysia , t, error } from 'elysia';

export const profilesRoutes = (app: Elysia, token: string) =>
    app.group('/profiles', (group) => {

        group.get('/get/:id', async ({ params }) => {
            const options = {
                method: 'GET',
                headers: {
                  accept: 'application/json',
                  Authorization: 'Bearer ' + token
                }
            };
        
            return {
                id: 1,
                name: 'Stache Noisy',
                email: 'dummy@mail.com',
                joined: '2022-01-01',
                stats: {
                  watched: {
                    movies: 5,
                    series: 3,
                    total: 1500
                  },
                  favorites: {
                    movies: 2,
                    series: 1,
                    genres: ['Sci-Fi', 'Thriller', 'Drama', 'Action', 'Mystery']
                  },
                },
                profileimage: 'https://placehold.co/400x400',
                watchlist: [ 14 ],
                recentlyWatched: [ 1, 2, 14 ],
                settings: {
                  quality: 'HD',
                  language: 'en',
                }
            };
        }, {
            params: t.Object({
                id: t.Number({ default: 1 })
            })
        })

        return group;
    });