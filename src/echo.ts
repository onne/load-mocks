import { MockBase } from './mockBase';
class EchoServer extends MockBase {
    constructor() {
        super();
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

new EchoServer().listen(parseInt(process.env.PORT || "80"));