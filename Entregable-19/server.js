const httpServer = require("./app");
const minimist = require("minimist");
const cluster = require('cluster');
const logger = require("./src/utils/Log4js");
const os = require('os')
const numCPUs = os.cpus().length;


const options = {
    alias: {
        "p": "PORT",
        "m": "MODE"
    },
    default: {
        "PORT": 8080
    }
};

const { PORT } = minimist(process.argv.slice(2), options);
const { MODE } = minimist(process.argv.slice(3), options);
console.log(PORT);
if (MODE == 'CLUSTER' && cluster.isPrimary) {
    logger.info(`Threads: ${numCPUs}`)
    for (let aux = 0; aux < numCPUs; aux++)
        cluster.fork()

    cluster.on('exit', worker => {
        logger.info(`Worker`, worker.process.pid, 'died', new Date().toLocaleString())
        //cluster.fork()  //get up another
    })
} else {
    process.on('exit', code => {
        logger.info(`Exit code: ${code}`)
    })

    //listener
    httpServer.listen(PORT, () => {
        console.log(`Server started at http://localhost:${PORT}`);
    })
}


