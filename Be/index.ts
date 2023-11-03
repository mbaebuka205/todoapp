import express, {Application} from 'express'
import mainApp from './mainApp';
import './utils/dbConfig'
import cors from 'cors'

const port:number = 2000;
const app:Application = express()

app.use(cors())
app.use(express.json())
mainApp(app)
const server = app.listen(port, () =>{
    console.log("server is up and running")
})

process.on('uncaughtException', (err:Error)=>{
    console.log('uncaughtException', err)
    process.exit(1)
})

process.on('rejectionHandled', (reason:any)=>{
    console.log('rejectionHandled', reason)
    server.close(()=>{
        process.exit(1)
    })
})