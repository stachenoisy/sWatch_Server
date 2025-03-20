import { Elysia , t, error } from 'elysia';

export const moviesRoutes = (app: Elysia, token: string) =>
    app.group('/movies', (group) => {

        group.get('/:type/:page/:lang', async ({ params }) => {
            const options = {
                method: 'GET',
                headers: {
                  accept: 'application/json',
                  Authorization: 'Bearer ' + token
                }
            };
        
            const response = await fetch(`https://api.themoviedb.org/3/movie/${params.type}?language=${params.lang}&page=${params.page}`, options);
            return response.json() ?? error(404);
        }, {
            params: t.Object({
                type: t.String({ default: 'popular' }),
                page: t.Number({ default: 1 }),
                lang: t.Optional(t.String({ default: 'en-US' }))
            })
        })

        return group;
    });