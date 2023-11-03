import { Router } from "express";

import { createTodo, readAllTodos, readTodo, updataTodo } from "../controller/todoController";

const router:Router = Router();

router.route('/create-todo').post(createTodo)
router.route('/read-todo').get(readAllTodos)
router.route('/read-todo/:todoID').get(readTodo)
router.route('/update-todo/:todoID').get(updataTodo)

export default router;