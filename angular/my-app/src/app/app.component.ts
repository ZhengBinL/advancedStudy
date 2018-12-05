import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  todos = [
    { id: 1, name: '吃饭', done: true },
    { id: 2, name: '睡觉', done: false },
    { id: 3, name: '打豆豆', done: true }
  ]
  todosname: ''
  handleDel(e, id) {
    e.preventDefault()
    this.todos = this.todos.filter(item => item.id !== id)

  }
  Addtodo() {
    if (this.todosname.trim() === "") return
    let id
    if (this.todos.length === 0) {
      id = 1
    } else {
      this.todos[this.todos.length - 1].id + 1
    }
    this.todos.push({
      id,
      name: this.todosname,
      done: false
    })
    this.todosname = ""
  }
  trackTodo(index, todo) {
    return todo.id
  }
  handleTag(item){
    item.done= !item.done
  }
}
