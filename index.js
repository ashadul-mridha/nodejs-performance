import cluster from 'cluster';
import cors from 'cors';
import express from 'express';
import os from 'os';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// timer fn
const timer = (duration) => {
    const startTime = Date.now();

    while(Date.now() - startTime < duration){
        // console.log('waiting');
    }

}

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.get('/timer', (req, res) => {
    timer(8000);
    res.send(`Timer ${process.pid} is done`);
});


if (cluster.isPrimary) {
    console.log('Running on primary');

    const cores = os.cpus();
    for (let i = 0; i < cores.length; i++) {
        cluster.fork();
    }
} else {
    console.log('Running on worker');
    app.listen(3000, () => {
        console.log('Server is running on port 3000');
    })
    
}


// console.log('cluster isPrimary', cluster);
