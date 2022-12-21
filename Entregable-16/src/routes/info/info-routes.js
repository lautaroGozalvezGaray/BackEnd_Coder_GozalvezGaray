const {Router} = require("express");
const {fork} = require("child_process");
const numCPUs = require("os").cpus().length;

const router = Router();

router.get('/', (_req, res) => {
    const processInfo = {
        args: process.argv,
        platform: process.platform,
        version: process.version,
        title: process.title,
        execPath: process.execPath,
        processId: process.pid,
        rss: process.memoryUsage().rss,
        n_CPUs:numCPUs
    };
    
    res.status(200).json(processInfo);
})
const randomNumbersGeneratorFork = fork('./src/utils/randomNumbersGenerator.js')
router.get('/randoms', (req, res) => {
    
    const cant = req.query.cant || 10000000;
    
    randomNumbersGeneratorFork.on('message', resultado => {
        res.status(200).json(resultado);
    })
    randomNumbersGeneratorFork.send(cant);
})

module.exports=router;