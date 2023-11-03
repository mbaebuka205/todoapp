import { ObjectId } from "mongodb";

export class todoModel {
    public _id: ObjectId
    public task: string
    public done: boolean
    public createdAt: string
    public achievedAt: boolean
    public achieved: null | boolean

    constructor(
        task: string,
        ceartedAt: string,
        achievedAt: boolean,
        achieved: null | boolean
    ){
    this._id = new ObjectId();    
    this.task = task
    this. done= false;
    this. createdAt= ceartedAt;
    this.achievedAt = achievedAt;
    this.achieved = achieved
    }
}