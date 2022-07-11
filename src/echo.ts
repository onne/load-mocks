import { MockBase } from './mockBase';
class EchoServer extends MockBase {
    constructor(latencyLimits: { min: number, max: number }) {
        super(latencyLimits);
        this.app.get('/', (req, res) => {
            this.randomlyDelay().then(() => {
                res.send('ok');
            });
                
        });
        this.app.post('/', (req, res) => {
            this.randomlyDelay().then(() => {
                res.send('ok');
            });
        });
    }
}

new EchoServer({min: 0, max: 250}).listen(80);