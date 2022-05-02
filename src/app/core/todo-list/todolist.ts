

export class Todolist {
    constructor(
        public id: string,
        public name: string,
        public completed: boolean) {
          this.id = id
          this.name = name
          this.completed = completed
        }
}
