import { authorize } from './../security/authz.handler';
import { authenticate } from './../security/auth.handler';
import { User } from './users.model';
import { ModelRouter } from "../common/model-router";
import * as restify from 'restify';



 class UsersRouter extends ModelRouter<User>{

    constructor(){
        super(User);
        this.on('beforeRender', document =>{
            document.password = undefined
        })
    }

    applyRoutes(app: restify.Server){

        app.post(`${this.basePath}`, this.save);
        app.get(`${this.basePath}`,[authorize('admin')], this.findAll);
        app.del(`${this.basePath}/:id`, [this.validateId,this.delete]);
        app.put(`${this.basePath}/:id`, [this.validateId,this.replace]);
        app.patch(`${this.basePath}/:id`, [this.validateId,this.update]);
        app.get(`${this.basePath}/:id`, [this.validateId,this.findById]);

        app.post(`${this.basePath}/login`, authenticate)
    }
}

export const userRouter = new UsersRouter;