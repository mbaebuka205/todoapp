
import axios from 'axios'

const URL:string = "http://localhost:2000/api/v1"

export const createTodo = async (data:any) =>{
    try{
        return await axios.post(`${URL}/create-todo`, data)
    } catch(error){
        console.log(error)
    }
}

export const readAllTodo = async () =>{
    try{
        return await axios.get(`${URL}/read-todo`).then((res)=>{
            return res.data.data
        })
    } catch(error){
        console.log(error)
    }
}

export const readTodo = async (todoID:string) =>{
    try{
        return await axios.get(`${URL}/read-todo/${todoID}`).then((res)=>{
            return res;
        })
    } catch(error){
        console.log(error)
    }
}

export const updatTodo = async (todoID:string) =>{
    try{
        return await axios.patch(`${URL}/update-todo/${todoID}`)
    } catch(error) {
        console.log(error)
    }
}