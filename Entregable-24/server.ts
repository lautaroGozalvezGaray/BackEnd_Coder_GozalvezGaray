import { createApp } from "https://deno.land/x/servest@v1.3.1/mod.ts"

const app = createApp();

app.handle("/", async (req)=>{
    await req.respond({
        status: 200,
        headers: new Headers({
            "content-type": "text/plain",
        }),
        body: "Helllo Deno"
    });
});

app.listen({port: 8888})
