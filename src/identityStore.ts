import { MockBase } from './mockBase';

const user = {
    id: "123",
    name: "John Doe",
}

class IdentityStore extends MockBase {
    constructor(latencyLimits: { min: number, max: number }) {
        super(latencyLimits);
        this.app.get('/user', (req, res) => {
            this.randomlyDelay().then(() => {
                res.send(user);
            });
        });
        this.app.post('/authenticate', (req, res) => {
            this.randomlyDelay().then(() => {
                res.send('ok');
            });
        });
    }
}

new IdentityStore({min: 0, max: 250}).listen(80);