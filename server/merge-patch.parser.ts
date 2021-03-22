import * as restify from 'restify';
import { BadRequestError } from 'restify-errors'

const mpContentType = 'application/merge-patch+json'

export const mergePatchBodyParser = (req: restify.Request, res: restify.Response, next) =>{
    if(req.getContentType() === mpContentType && req.method === 'PATCH'){
        (<any>req).rawBody = req.body; // Guardar o body original para eventuais consultas
        try {    
            req.body = JSON.parse(req.body);
        } catch (err) {
            return next(new BadRequestError(`Invalid content: ${err.message}`))
        }
        
    }

    return next();
}