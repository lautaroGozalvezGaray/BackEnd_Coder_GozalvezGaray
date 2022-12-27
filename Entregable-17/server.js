const httpServer = require("./app");
const minimist = require("minimist");

const options = {
    alias: {
        "p": "PORT"
    },
    default: {
        "PORT": 8080
    }
};

const { PORT } = minimist(process.argv.slice(2), options);

httpServer.listen(PORT, () => {
    console.log(`Server started at http://localhost:${PORT}`);
})
