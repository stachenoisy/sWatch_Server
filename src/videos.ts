import { Elysia , t, error } from 'elysia';

export const videosRoutes = (app: Elysia, token: string) =>
    app.group('/video', (group) => {

        group.get('/get/:type/:id/:lang', async ({ params }) => {
            const options = {
                method: 'GET',
                headers: {
                  accept: 'application/json',
                  Authorization: 'Bearer ' + token
                }
            };
        
            const response = await fetch(`https://api.themoviedb.org/3/${params.type}/${params.id}?language=${params.lang}`, options);
            return response.json() ?? error(404);
        }, {
            params: t.Object({
                type: t.String({ default: 'movie' }),
                id: t.Number({ default: 1 }),
                lang: t.String({ default: 'en-US' })
            })
        })

        return group;
    });