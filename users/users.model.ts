import * as mongoose from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { environment } from './../common/environment'
import { validateCPF } from './../common/validators';

export interface User extends mongoose.Document{
    name?: string,
    cpf?: string,
    email?: string,
    password?:string,
    profiles: string[]
    matchesPass(password: string): boolean,
    hasAny(...profiles: string[]):boolean
}


const userSchema = new mongoose.Schema<User>({
    name: {type: String, required: true},
    cpf: {type: String, required: true, validate: {validator: validateCPF , message: '{PATH}: Invalid CPF ({VALUE})'}},
    email: {type: String, unique: true, required: true, match: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/},
    password: {type: String, select: false, required: true},
    profiles: {type: [String], required: false}
}, {
    timestamps: true
});
  
userSchema.methods.matchesPass = function(password: string): boolean {
   return bcrypt.compareSync(password, this.password);
}


/**Essa função verifica se o usuario possui ao menos um tipo de autenticação para
 * continuar logado e autenticado
 */
userSchema.methods.matches = function(...profiles: string[]): boolean {
    return profiles.some(profile => this.profiles.indexOf(profile)!== -1)
}


const hashPassword = (obj, next) =>{
    bcrypt.hash(obj.password, environment.security.saltRounds)
    .then(hash =>{
        obj.password = hash;
        next();
    }).catch(next)
}

const saveMiddleware = function(next){
    const user: User = this
    if(!user.isModified('password')){
        next();
    }else{
     hashPassword(user,next);
    }
};

const updateMiddleware = function(next){
    if(!this.getUpdate().password){
        next();
    }else{
     hashPassword(this.getUpdate(),next);
    }
};

userSchema.pre('save', saveMiddleware);
userSchema.pre('findOneAndUpdate', updateMiddleware);
userSchema.pre('update', updateMiddleware);


export const User = mongoose.model<User>('User', userSchema);