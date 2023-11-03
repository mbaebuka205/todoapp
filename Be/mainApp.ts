import {Application, Request, Response} from 'express'
import { statusCode } from './utils/statusCode'
import todo from './router/todoRouter'
const mainApp = (app:Application) =>{
    app.use('/api/v1', todo)
    app.get('/', (req:Request, res:Response)=>{

      try{
        res.status(statusCode.OK).json({
            message:"welcome",
            data:""
        })
      } catch(err) {
        res.status(statusCode.BAD_REQUEST).json({
            message:"Error",
        })
      }
    })
}

export default mainApp;