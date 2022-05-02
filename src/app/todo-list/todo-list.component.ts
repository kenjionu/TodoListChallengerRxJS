import { Component, OnInit } from '@angular/core';
import { iTodo } from '../core/interface/todo-list';
import { FormControl, Validators, FormBuilder } from '@angular/forms';
import { AddTask, RemoveTask, RemoveAllTask, ToggleTodo } from '../store/todo.actions';
import { Store} from '@ngxs/store';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {

  todolist: Observable<iTodo[]> = new Observable<iTodo[]>();
  submitted = false;

  constructor(private fb: FormBuilder, private readonly store: Store) {
    (window as any)['ngxs'] = store;
  }


  taskForm = this.fb.group({
    name: new FormControl(null, [Validators.required, Validators.minLength(3) ])
  })


  ngOnInit(): void {
    this.todolist = this.store.select(state => state.todolist.todolist)
  //  this.getTask();
  }


  addTask(name: any): any{
    this.submitted = true;
    if(name.length > 0 ){
      this.store.dispatch(new AddTask({name: name, completed: false, id: Math.random().toString()}))
    }
    this.taskForm.reset()


  }

  deleteTask(taskitem:iTodo) {
    this.store.dispatch(new RemoveTask(taskitem.id))
  }



  deleteAllTask() {
    this.store.dispatch(new RemoveAllTask())
  }

  ToggleTodo(taskitem:iTodo, $eventx:any){
    let $eventcx = $eventx.target.checked
    this.store.dispatch(new ToggleTodo({id: taskitem.id, name: taskitem.name, completed: $eventcx}));

  }




}
