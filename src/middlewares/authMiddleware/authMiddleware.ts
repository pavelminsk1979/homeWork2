import {NextFunction,Response,Request} from "express";



export const authMiddleware = (req:Request,res:Response,next:NextFunction)=>{
    if(req.headers['authorization']==='Basic YWRtaW46cXdlcnR5'){
        next()
    } else {res.sendStatus(401)}
}








/*
import {NextFunction, Response, Request} from "express";

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const LOGIN = 'login'
    const PASSWORD = 'qwerty'
    const auth = req.headers['authorization']

    if (!auth) {
        res.sendStatus(401)
        return
    }
    const [basic, token] = auth.split(' ')
    const decodedToken = Buffer.from(token, 'base64').toString()
    const [login, password] = decodedToken.split(':')
    if (login === LOGIN && password === PASSWORD) {
        next()
    } else {
        res.sendStatus(401)
    }
}*/
