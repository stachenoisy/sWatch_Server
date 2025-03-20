import { Elysia , t, error } from 'elysia';

export const genresRoutes = (app: Elysia, token: string) =>
    app.group('/genres', (group) => {

        group.get('/:type/:lang', async ({ params }) => {
            const options = {
                method: 'GET',
                headers: {
                  accept: 'application/json',
                  Authorization: 'Bearer ' + token
                }
            };
        
            const response = await fetch(`https://api.themoviedb.org/3/genre/${params.type}/list?language=${params.lang}`, options);
            return response.json() ?? error(404);
        }, {
            params: t.Object({
                type: t.String({ default: 'movie' }),
                lang: t.Optional(t.String({ default: 'en-US' }))
            })
        })

        return group;
    });