import * as https from 'https';
import * as http from 'http';
import express from 'express';

export abstract class MockBase {
    public app: express.Application;
    public server: http.Server | https.Server;

    private minLatency = parseInt(process.env.LATENCY_MIN || "0");
    private maxLatency = parseInt(process.env.LATENCY_MAX || "250");

    constructor() {
        this.app = express();
        this.server = http.createServer(this.app);
    }

    public listen(port: number) {
        console.log("Starting mock server on port " + port + " and latency limits min: " + this.minLatency + " max: " + this.maxLatency);
        this.server.listen(port);
    }

    protected async randomlyDelay(): Promise<void> {
        const delay = Math.random() * (this.maxLatency - this.minLatency) + this.minLatency;
        return new Promise(resolve => setTimeout(resolve, delay));
    }
}