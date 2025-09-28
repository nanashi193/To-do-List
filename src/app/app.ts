import {Component} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {Todo} from './models/todo';

const STORAGE_KEY='angular-todo';

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
  //------------Persistence
  ngOnInit() {
    this.load();
  }
  private save(){
    localStorage.setItem(STORAGE_KEY, JSON.stringify(this.ListTodos));
  }
  private load(){
    try{
      const raw = localStorage.getItem(STORAGE_KEY);
      this.ListTodos = raw ? JSON.parse(raw) as Todo[] : this.ListTodos;
    }catch{
    }
  }
//--------------function
  add() {
    const t = this.newTodo.trim();
    if (!t) return;  //chan input rong
    this.ListTodos.unshift({id: crypto.randomUUID(), title: t, completed: false});
    this.newTodo = '';
    this.save();
  }
  toggle(todo: Todo) {
    todo.completed = !todo.completed;
    this.save();
  }
  remove(todo: Todo) {
    this.ListTodos = this.ListTodos.filter(x => x.id !== todo.id);
    this.save();
  }

  //----------state cho che do edit
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
    this.save();

  }

  cancelEdit() {
    this.editingId = null;
    this.editingText = '';
  }

  //--------------filter
  filter: 'all' | 'active' | 'completed'  = 'all';
  setFilter(f: 'all' | 'active' | 'completed') {
    this.filter = f;
  }
  get filteredTodos() {
    switch (this.filter) {
      case 'active': return this.ListTodos.filter(t=>!t.completed);
      case 'completed': return this.ListTodos.filter(t=>t.completed);
      default: return this.ListTodos;
    }
  }
}
