import { Injectable } from "@nestjs/common";

@Injectable()
export class TodosService {
    todos = [{ id: 2, text: 'gsaufguaucga' }, { id: 1, text: 'ueywyrqwufgui' }]
    getAllTodos() {
        return this.todos
    };
    getSingle(id: number) {
        return this.todos.filter(sig => sig.id == id)
    }
}