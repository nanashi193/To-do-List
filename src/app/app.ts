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

  ListTodos: Todo[] = [
    {id: crypto.randomUUID(), title: 'Learn Angular', completed: true},
    {id: crypto.randomUUID(), title: 'Do Todo-List', completed: false},
    {id: crypto.randomUUID(), title: 'Sleep', completed: true},
  ];

  add() {
    const t = this.newTodo.trim();
    if (!t) return;  //chan input rong
    this.ListTodos.unshift({id: crypto.randomUUID(), title: t, completed: false});
    this.newTodo = '';
  }

  toggle(todo: Todo) {
    todo.completed = !todo.completed;
  }

  remove(todo: Todo) {
    this.ListTodos = this.ListTodos.filter(x => x.id !== todo.id);
  }

  //state cho che do edit
  editingId: string | null = null;
  editingText: string = '';

  //bat dau edit
  starEdit(todo: Todo) {
    this.editingId = todo.id;
    this.editingText = todo.title;
  }

  confirmEdit(todo: Todo) {
    const t = this.editingText.trim();
    if (t) todo.title = t;
    this.editingId = null;
    this.editingText = '';
  }

  cancelEdit() {
    this.editingId = null;
    this.editingText = '';
  }

  //filter
  filter: 'all' | 'active' | 'completed' = 'all';

  setFilter(f: 'all' | 'active' | 'completed') {
    this.filter = f;
  }

  get filteredTodos() {
    switch (this.filter) {
      case 'active':
        return this.ListTodos.filter(t => !t.completed);
      case 'completed':
        return this.ListTodos.filter(t => t.completed);
      default:
        return this.ListTodos;
    }
  }
}
