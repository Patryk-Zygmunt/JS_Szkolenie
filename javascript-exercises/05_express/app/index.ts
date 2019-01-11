import * as express from "express";
import { initCollections } from "./mongoCollections";
import { createApp } from "./expressApp";

const settings = {
    mongodb: "mongodb://localhost:27017/tododb",
    port: "5634"
};

start();

async function start() {
    await initCollections(settings.mongodb);
    const app = await createApp();

    app.listen(settings.port, function () {
        console.log('nasluchuje na porcie ' + settings.port);
    });
}
