import express, {Application, Request, Response} from 'express'
import { statusCode } from '../utils/statusCode'
import { client, db } from '../utils/dbConfig'
import { todoModel } from '../model/todoModel'
import moment from 'moment'
import {ObjectId} from 'mongodb'


export const createTodo =async(req:Request, res:Response):Promise<Response> =>{
    try{
        await client.connect()

        const {task, timer} = req.body;

        let newTime = timer * 1000
        // let newTime = timer * 864000

        let time = new Date().getTime() + newTime

        let createdAt = moment(new Date().getTime()).format('LLL');
        let achievedAt:any = moment(time).format("LLL");
        let achieved = null;

        let todo: any = new todoModel(task, createdAt, achievedAt, achieved)

        let timmer = setTimeout(async () =>{
            await db.updateOne(
              {_id: new ObjectId(todo._id)},
              {$set :{ achieved: true}}
            );
            clearTimeout(timmer)
        }, newTime)

        await db.insertOne(todo);

        return res.status(statusCode.CREATED).json({
            message:'created',
            data:todo
        })
    } catch(error) {
        return res.status(statusCode.BAD_REQUEST).json({
            message:'error'
        })
    }
}


export const readAllTodos = async(req:Request, res:Response):Promise<Response> =>{
    try{
        await client.connect()

        let todo = await db.find().toArray()

        return res.status(statusCode.OK).json({
            message:'reading',
            data:todo
        })
    } catch(error) {
        return res.status(statusCode.BAD_REQUEST).json({
            message:'error'
        })
    }
    
}

export const readTodo = async(req:Request, res:Response):Promise<Response> =>{
   try{
     await client.connect()

     let {todoID} = req.params

     let todo = await db.findOne({_id: new ObjectId(todoID)})
     
     return res.status(statusCode.CREATED).json({
        message:'created',
        data:todo
    })
} catch(error) {
    return res.status(statusCode.BAD_REQUEST).json({
        message:'error'
    })
}
   
}


export const updataTodo = async(req:Request, res:Response):Promise<Response> =>{

    try{
        await client.connect()

        const {totoID} = req.params

        let findTodo: any = await db.findOne({_id: new ObjectId(totoID)});

        if(findTodo.achieved) {
            return res.status(statusCode.OK).json({
                message: "time for editing has passed"
            });

        } else{
            let todo = await db.updateOne(
                {_id: new ObjectId(totoID)},
                {$set: {done:true}}
                );
                return res.status(statusCode.CREATED).json({
                    message:'created',
                    data:todo
                })        
        }
       
    } catch(error) {
        return res.status(statusCode.BAD_REQUEST).json({
            message:'error'
        })
    }

}