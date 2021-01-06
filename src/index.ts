import "reflect-metadata";
import { createConnection } from "typeorm";
import * as express from "express";


import * as cors from 'cors';
import * as helmet from 'helmet';

import * as bodyParser from "body-parser";

import routes from "./routes";

const PORT = process.env.PORT || 3000;

createConnection().then(async connection => {

    // create express app
    const app = express();
    app.use(cors());
    app.use(helmet());

    app.use(bodyParser.json());

    app.use('/', routes);

    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`)
    });

}).catch(error => console.log(error));
