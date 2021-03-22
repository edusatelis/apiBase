import { tokenParser } from './../security/token.parser';
import { environment } from './../common/environment';
import * as restify from 'restify'
import { Router } from '../common/router';
import * as Mongoose from 'mongoose';
import { mergePatchBodyParser } from './merge-patch.parser';
import { handleError } from './error.handler'

export class Server {

    app: restify.Server;

    inializeDb(): any{
        (<any>Mongoose).Promise = global.Promise
        return Mongoose.connect(environment.db.url, { useUnifiedTopology: true, useNewUrlParser: true});
    }

    initRoutes(routers: Router[]): Promise<any>{
        return new Promise((resolve, reject)=>{
            try {
                /**Criando o servidor e adicionando a uma variavel global */
                this.app = restify.createServer({
                    name: 'Base-Api',
                    version: '1.0.0'
                });
                /** Middleware que possibilita a resposta em json enviados pela query*/
                this.app.use(restify.plugins.queryParser());
                /** Middleware que possibilita a resposta em json pelo body */
                this.app.use(restify.plugins.bodyParser());
                /**Middleware que possibilita a compreensão melhor ao metodo PATCH via contentType */
                this.app.use(mergePatchBodyParser);
                /**Middleare que verifica se a pessoa esta autenticada */
                this.app.use(tokenParser);
                //ROUTES
                for (let router of routers){
                    router.applyRoutes(this.app);
                }
                
                /** Escuta a porta e envia as informações ao index */
                this.app.listen(environment.server.port, ()=>{
                    resolve(this.app);
                })
                
                this.app.on('restifyError', handleError);

                
            } catch (error) {
                reject(error);
            }
        })
    }

    /** Função de Startup, retornando o servidor configurado*/
    bootstrap(routers: Router[] = []): Promise<Server>{
        return this.inializeDb().then(() =>  this.initRoutes(routers).then(()=> this));

    }
}