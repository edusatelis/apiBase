import * as restify  from 'restify';
import { NotFoundError } from 'restify-errors';
import { EventEmitter } from 'events'


export abstract class Router extends EventEmitter{
 
    abstract applyRoutes(app: restify.Server)


    envelope(document: any): any {
        return document
    }
    
    envelopeAll(documents: any[],  options: any = {}): any {
        return documents
    }

    /**O metodo render é onde pegamos a resposta e se conter o documento,
     *  iremos retornar deste modo, deixa a aplicação mais modular e utiliza
     *  a metodologia de reutilização de código
     *  */
    render(res: restify.Response, next: restify.Next){
        return (document)=>{
            if(document){
                // Esta linha deixa o um evento escutando e permite modificações antes de renderizar
                this.emit('beforeRender', document); 
                res.json(this.envelope(document));
            }else{
                throw new NotFoundError('Documento não encontrado')
            }
            return next();

        }
    }

    renderAll(res: restify.Response, next: restify.Next, options: any = {}){
        return(documents: any[])=>{
            if(documents){
                documents.forEach((document,index,array)=>{
                    this.emit('beforeRender', document)
                    array[index] = this.envelope(document)
                })
                res.json(this.envelopeAll(documents, options))
            }else{
                res.json([])
            }
          return  next();
        }
    }
}