import * as express from "express";
import { Request, Response } from "express";
import { ObjectID } from "mongodb";
import * as bodyParser from "body-parser";
import * as morgan from "morgan";
import * as todoService from "./todoService";

export function createApp(): express.Express {
    const app = express();
    app.use(bodyParser.json());
    app.use(morgan("tiny"));

    app.get('/api/todos/dropall', function (req, res, next) {
        todoService.dropAll().then(data => res.end("OK"), next);
    });

    app.get('/api/todos', /*delay(4000), error("blad :)"),*/ function (req, res, next) {
        todoService.getAll(req.query.text).then(data => res.json(data), next);
    });
    app.get('/api/todos/:id', function (req, res, next) {
        todoService.getById(new ObjectID(req.params.id)).then(data => res.json(data), next);
    });
    app.post('/api/todos', function (req, res, next) {
        todoService.add(req.body).then(data => res.json(data.toString()), next);
    });
    app.delete('/api/todos/:id', function (req, res, next) {
        todoService.deleteById(new ObjectID(req.params.id)).then(data => res.end(), next);
    });
    app.put('/api/todos/:id', function (req, res, next) {
        req.body._id = new ObjectID(req.body._id);
        todoService.update(new ObjectID(req.params.id), req.body).then(data => res.end(), next);
    });

    return app;
}


function delay(period = 0) {
    return (req: Request, res: Response, next: Function) =>
        period === 0 ? next() : setTimeout(next, period);
}

function error(err: any) {
    return (req: Request, res: Response, next: Function) => next(err);
}
