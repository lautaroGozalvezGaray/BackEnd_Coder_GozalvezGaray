const httpServer = require("./app");


const PORT = process.env.PORT || 3000

httpServer.listen(PORT, () => {
    console.log("listening Port at 8080");
})
