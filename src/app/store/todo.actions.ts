import { iTodo } from "../core/interface/todo-list";

export class AddTask {
  static readonly type = '[TodoList] Add Task';
  constructor(public payload: iTodo) {}
}

export class RemoveAllTask {
  static readonly type = '[TodoList] RemoveAllTask';
}


export class RemoveTask {
  static readonly type = '[TodoList] RemoveTask';
  constructor(public payload: string) {}
}

export class ToggleTodo {
  static readonly type = '[TodoList] ToggleTodo';
  constructor(public payload: iTodo) {}
}
