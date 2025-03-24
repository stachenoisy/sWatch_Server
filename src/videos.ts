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

            const isFirstValid = response.ok;

            if (!isFirstValid) { return error(404); }

            const videosResponse = await fetch(`https://api.themoviedb.org/3/${params.type}/${params.id}/videos?language=${params.lang}`, options);

            if (videosResponse.ok) {
                const videos = await videosResponse.json();
                if (videos.results.length != 0) { 
                    const result = videos.results.find((video: any) => video.type === 'Trailer');

                    if (result) { 
                        let tempData = await response.json();
                        tempData.videoid = result.key
        
                        return { ...tempData };
                    }
                }
            }

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