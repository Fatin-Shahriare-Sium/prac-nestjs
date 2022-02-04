import { Controller, Get, Param, Post, Query } from "@nestjs/common";
import { log } from "console";
import { TodosService } from "./todos.service";

@Controller('todo')
export class TodosController {
    constructor(private readonly todosService: TodosService) { }
    @Get()
    getAllTodosx() {
        return this.todosService.getAllTodos()
    };
    @Get('/create')
    createTodo(@Query('text') text: string) {
        console.log(text)
        return text
    }
    @Get('/:id')
    findOneTodo(@Param('id') id: number) {
        console.log(id)
        return this.todosService.getSingle(id)
    }

}