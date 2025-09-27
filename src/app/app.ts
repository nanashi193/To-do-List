import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})


export class App {
  title = 'angular-todo';
  todos = ["hoc Angular", "lam To-do List project", "Ngu?"];
  newTodo = ''; //bien cho input

  add(){
    const t = this.newTodo.trim();
    if(!t) return;  //chan input rong
    this.todos.unshift(t); //them vao dau danh sach
    this.newTodo = '';
  }

}
