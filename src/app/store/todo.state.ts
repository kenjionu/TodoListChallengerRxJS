import { state } from '@angular/animations';
import { Injectable } from '@angular/core';
import {Action, Selector, State, StateContext} from '@ngxs/store';
import { getStateDiffChanges } from '@ngxs/store/src/internal/internals';
import { iTodo } from '../core/interface/todo-list';
// import { Todolist } from '../core/todo-list/todolist';
import { AddTask, RemoveAllTask, RemoveTask, ToggleTodo} from './todo.actions';

// import {AddTodo, EmptyTodo} from './todo.actions';

export interface TodoStateModel {
  todolist: iTodo[];
}


@State<TodoStateModel>({
  name: 'todolist',
  defaults: {
    todolist: []
  },
})
@Injectable()
export class TodoState {

  @Selector()
  static todolist(state: TodoStateModel) {
    return state.todolist;
  }
  // @Selector()
  // static getTodoList(state: TodoStateModel): string[] {
  //   return state.todoList;
  // }

  @Action(AddTask)
  // addTodo(ctx: StateContext<TodoStateModel>, action: AddTask) {
  //   const todo = { id: Math.random().toString(), name: action.payload, completed: false}
  //   ctx.patchState({
  //     todolist: [todo, ...ctx.getState().todolist]
  //   });
    // patchState({todoList: [...getState().todoList, name]});
    add({getState, setState }: StateContext<TodoStateModel>, { payload }:AddTask) {
      const state = getState();
      setState({
          todolist: [...state.todolist, payload]
      })
  }

  @Action(RemoveAllTask)
  removeAll({getState, patchState }: StateContext<TodoStateModel>, {}: RemoveAllTask ) {
      patchState({
        todolist:  []
      })
  }


  @Action(RemoveTask)
  removeTask({getState, patchState}: StateContext<TodoStateModel>, {payload}: RemoveTask) {
    patchState({
      todolist: getState().todolist.filter(item => item.id !== payload)
    })
  }

  @Action(ToggleTodo)
  ToggleTodo(
    {getState, patchState}: StateContext<TodoStateModel>,
    {payload}: ToggleTodo) {
    // const todo = payload;
    // todo.completed = payload.completed

    patchState({
      todolist: getState().todolist.map(row => {
        if(row.id === payload.id) {
          return payload;
        }
        return row;
      })
    })
  }
  // addStatusx(ctx: StateContext<TodoStateModel>, action: ToggleTodo) {
  //   const todo = action.payload;
  //   todo.completed = action.payload.completed
  //   ctx.patchState({
  //     todolist: [...ctx.getState().todolist]
  //   })
  // }
}
