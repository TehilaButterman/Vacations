import express from 'express'
import authController from './6-controllers/auth-controller'
import expressFileUpload from 'express-fileupload'
import { Request, Response, NextFunction } from 'express'
import catchAll from './3-middleware/catch-all';
import { RouteNotFound } from './4-models/error-model';
import cors from 'cors'
import vacationController from './6-controllers/vacation-controller'
import SocketLogic from './5-logic/socket-logic'
import sanitize from './3-middleware/sanitize';
import expressRateLimit from 'express-rate-limit';
import isAdmin from './3-middleware/is-admin';
import adminController from './6-controllers/admin-controller'
import config from './2-utils/config';

// Using express server:
const expressServer = express();

// Security - blocking a customer with multiple requests:
expressServer.use('/api/', expressRateLimit({
    windowMs: 1000,
    max: 500,
    message: "Are you a hacker?"
}));

// Send data from DB in json format:
expressServer.use(express.json());

// Security - protection against invalid input:
expressServer.use(sanitize);

// Connect backend to frontend:
expressServer.use(cors({ origin: 'http://localhost:3000' }));

// Use files for images:
expressServer.use(expressFileUpload());

// Auth controller:
expressServer.use('/api/auth', authController);

// Vacations controller:
expressServer.use('/api', vacationController);

// Admin controller:
expressServer.use('/api', isAdmin.isAdmin, adminController)


// Block invalid routes
expressServer.use("*", (request: Request, response: Response, next: NextFunction) => {
    const err = new RouteNotFound(request.method, request.originalUrl);
    next(err);
});


// Prevent server crashes: 
expressServer.use(catchAll.catchAll);

// Connect to port:
const httpServer = expressServer.listen(config.port, () => {
    console.log("listening...");

});

// Connect to socket.io:
SocketLogic.listen(httpServer)

