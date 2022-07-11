import * as https from 'https';
import * as http from 'http';
import express from 'express';

export abstract class MockBase {
    public app: express.Application;
    public server: http.Server | https.Server;
    private latencyLimits: { min: number, max: number };

    constructor(latencyLimits: { min: number, max: number }) {
        this.latencyLimits = latencyLimits;
        this.app = express();
        this.server = http.createServer(this.app);
    }

    public listen(port: number) {
        console.log("Starting mock server on port " + port + " and latency limits: " + JSON.stringify(this.latencyLimits));
        this.server.listen(port);
    }

    protected async randomlyDelay(): Promise<void> {
        const { min, max } = this.latencyLimits;
        const delay = Math.random() * (max - min) + min;
        return new Promise(resolve => setTimeout(resolve, delay));
    }
}