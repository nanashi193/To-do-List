import {Component} from '@angular/core';
import {FormsModule} from '@angular/forms';

type Todo = { id: string; title: string; completed: boolean };

@Component({
  selector: 'app-root',
  imports: [FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})


export class App {
  newTodo = ''; //bien cho input

  todos: Todo[] = [
    {id: crypto.randomUUID(), title: 'Learn Angular', completed: true},
    {id: crypto.randomUUID(), title: 'Do Todo-List', completed: false},
    {id: crypto.randomUUID(), title: 'Sleep', completed: true},
  ];

  add() {
    const t = this.newTodo.trim();
    if (!t) return;  //chan input rong
    this.todos.unshift({id: crypto.randomUUID(), title: t, completed: false});
    this.newTodo = '';
  }

  toggle(todo: Todo) {
    todo.completed = !todo.completed;
  }

  remove(todo: Todo) {
    this.todos = this.todos.filter(x => x.id !== todo.id);
  }
}
