import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { TodoListComponent } from './todo-list.component';
// import { Todolist } from '../core/todo-list/todolist';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { BrowserModule, By } from '@angular/platform-browser';
import { iTodo } from '../core/interface/todo-list';
import { CUSTOM_ELEMENTS_SCHEMA, DebugElement } from '@angular/core';
import { NgxsModule, Store } from '@ngxs/store';
import { TodoState } from '../store/todo.state';
import { routes } from '../app-routing.module';
import { MockLocationStrategy } from '@angular/common/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { LocationStrategy } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Observable } from 'rxjs';
import { AddTask, RemoveAllTask, RemoveTask, ToggleTodo } from '../store/todo.actions';



describe('TodoListComponent', () => {
  let component: TodoListComponent;
  let fixture: ComponentFixture<TodoListComponent>;

  let el: DebugElement;
  let formBuilder: FormBuilder;
  let store: Store;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        BrowserModule,
        FormsModule,
        HttpClientTestingModule,
        RouterTestingModule.withRoutes(routes),
        NgxsModule.forRoot([TodoState])
      ],
      providers: [
        { provide: LocationStrategy, useClass: MockLocationStrategy },
        FormBuilder,
        // Todolist

      ],
      declarations: [
        TodoListComponent,
        ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents()
    .then(() =>  {
      fixture = TestBed.createComponent(TodoListComponent);
      component = fixture.componentInstance;
      el = fixture.debugElement;
      store = TestBed.inject(Store);
      formBuilder = TestBed.inject(FormBuilder);
      // component.taskForm = formBuilder.group({
      //   name: new FormControl(null,
      //     [Validators.required, Validators.minLength(3)])
      //   });
        fixture.detectChanges();
    })
  });

  // beforeEach(() => {
  //   fixture = TestBed.createComponent(TodoListComponent);
  //   component = fixture.componentInstance;
  //   component.taskForm = formBuilder.group({
  //     name: new FormControl(null,
  //       [Validators.required, Validators.minLength(3)])
  //     });
  //   fixture.detectChanges();
  // });


  it('should ngOnInit', () => {
    component.todolist = new Observable<iTodo[]>();

    component.ngOnInit()

    expect(component.todolist).toBeTruthy()


      // component.ngOnInit()
      // expect(component.todolist).toBeUndefined()
    // spyOn(component, "getTask").and.returnValue(tasks)
    // component.ngOnInit();
    // expect(component.getTask).toHaveBeenCalled()
  })

  it('should ngOnInit', () => {


    component.ngOnInit()

    expect(component.todolist).toBeTruthy()


      // component.ngOnInit()
      // expect(component.todolist).toBeUndefined()
    // spyOn(component, "getTask").and.returnValue(tasks)
    // component.ngOnInit();
    // expect(component.getTask).toHaveBeenCalled()
  })


    describe("testing Task with jasmine", function() {

    it('should addTask formgroup', () => {
      expect(component.taskForm instanceof FormGroup).toBe(true)
    })

    it('should button add chequed button task', () => {
      const button = el.query(By.css("#submitTaskadd"))
      expect(button).toBeTruthy("Could not button")
    })

    it('should button add task', () => {
      let Data: iTodo = {
        name: '', id: '34', completed: false
      }

      component.addTask(Data)
      const feed = store.selectSnapshot(state => state.todolist.todolist);

      expect(feed).toEqual([])
      // const net = '440'
      // component.addTask(net)
      // expect(component.todolist).toEqual(component.todolist)
    })



    it('should button add task', () => {
      let Data: iTodo = {
        name: 'test', id: '1234', completed: false
      }
      store.dispatch(new AddTask(Data));

      component.addTask(Data)

      const feed = store.selectSnapshot(state => state.todolist.todolist);
      expect(feed).toEqual([Data]);
      // const net = '440'
      // component.addTask(net)
      // expect(component.todolist).toEqual(component.todolist)
    })

    it('should addtask disable button false', () => {
      component.taskForm.disabled
      expect(component.taskForm.valid).toBe(false)
      expect(component.taskForm.disabled).toBe(false)
    })

    it('should deleteTaskAll', () => {
      let Data: iTodo = {
        name: 'test', id: '123', completed: false,
      }
      let Data2: iTodo = {
        name: 'test1', id: '1231', completed: false,
      }
      let Data3: iTodo = {
        name: 'test2', id: '12332', completed: false,
      }
      let Data4: iTodo = {
        name: 'test3', id: '123434', completed: false,
      }
      let Data5: iTodo = {
        name: 'test4', id: '1233233', completed: false,
      }
      let Data6: iTodo = {
        name: 'test5', id: '1232323', completed: false,
      }
      store.dispatch(new AddTask(Data));
      store.dispatch(new AddTask(Data2));
      store.dispatch(new AddTask(Data3));
      store.dispatch(new AddTask(Data4));
      store.dispatch(new AddTask(Data5));
      store.dispatch(new AddTask(Data6));
      store.dispatch(new RemoveAllTask())

      const feed = store.selectSnapshot(state => state.todolist.todolist);

      expect(feed).toEqual([])
      // deleteAllTask() {
      //   this.store.dispatch(new RemoveAllTask())
      // }

    })

    it('button more than 3 character activate', fakeAsync(async () => {
      await component.addTask;
      await fixture.whenStable();
      fixture.detectChanges(); // add a fixture.detectChanges() for change detection to run
      // and maybe it will paint the button then.
      let inputDebugElems = fixture.debugElement.query(By.css('.add-todo'));
      let buttonDebugElems  = fixture.debugElement.query(By.css('#submitTaskadd'));
      // console.log('elements =>');
      // console.log(buttonDebugElems);
      // console.log(inputDebugElems);

      console.log(inputDebugElems);

      // console.log(buttonDebugElems.nativeElement.disabled === true)

      if(inputDebugElems.nativeElement.value > 3) {
        buttonDebugElems.nativeElement.disabled === false

      }

      expect(buttonDebugElems.nativeElement.disabled).toEqual(true)
      // Here, I have 0 elements.
    }))

    it('DisableCreate set to true disables the submit button', () => {
      // component.disableCreate = true;
      // component.data = null;
      fixture.detectChanges();
      expect(el.nativeElement.querySelector('#submitTaskadd').disabled).toBeTruthy();
     });

     it('DisableCreate set to false enables the submit button', () => {
      // component.disableCreate = false;
      // component.data = null;

      fixture.detectChanges();
      // expect(el.nativeElement.querySelector('#submitTaskadd').disabled).toBeFalsy();
      expect(component.submitted).toBeFalsy()

     });

    it('should deleteTask', () => {

      let Data: iTodo = {
        name: 'test', id: '1234', completed: false
      }
      store.dispatch(new AddTask(Data));


      component.addTask(Data)

      store.dispatch(new RemoveTask(Data.id))

      const feed = store.selectSnapshot(state => state.todolist.todolist);
      expect(feed).toEqual([]);
    })
  });

  it('should ToggleTodo valid', () => {

    let Data: iTodo = {
      name: 'test', id: '1234', completed: true
    }
    store.dispatch(new ToggleTodo(Data));




    const feed = store.selectSnapshot(state => state.todolist.todolist);
    expect(feed).toEqual([]);
  })

  it('form should be invalid', () => {
    fixture.detectChanges();
    component.taskForm.controls['name'].setValue('')
    expect(component.submitted).toBeFalsy()

   });

   it('form should be invalid Form', () => {
    fixture.detectChanges();
    component.taskForm.controls['name'].setValue('')
    expect(component.taskForm.valid).toBeFalsy()
   });

   it('form should be invalid button disabled', () => {
    fixture.detectChanges();
    component.taskForm.controls['name'].setValue('')
      expect(el.nativeElement.querySelector('#submitTaskadd').disabled).toBeTruthy();
   });

   it('form should be valid', () => {
    component.taskForm.controls['name'].setValue('Alohaaa')
    fixture.detectChanges();
    expect(component.taskForm.valid).toBeTruthy()

   });


  // it('should ngOnInit', () => {
  //   // let taskmock = component.tasks = [
  //   //   new Todolist(`list-${Math.random()}`,'ds', false)
  //   // ];


  //   component.ngOnInit();
  //   expect(component.tasks).toEqual(taskmock)
  // })




  // describe("testing Task with jasmine", function() {

  //   it('should addTask formgroup', () => {
  //     expect(component.taskForm instanceof FormGroup).toBe(true)
  //   })

  //   it('should button add chequed button task', () => {
  //     const button = el.query(By.css("#submitTaskadd"))
  //     expect(button).toBeTruthy("Could not button")
  //   })

  //   it('should button add task', () => {

  //     component.addTask()
  //     expect().toEqual({
  //       id: "list-43242342424",
  //       name: "terror",
  //       completed: true,
  //     })
  //   })

  //   it('should addtask disable button false', () => {
  //     component.taskForm.disabled
  //     expect(component.taskForm.disabled).toBe(false)
  //   })

  //   it('should deleteTask', () => {
  //     let s: iTodo = {
  //       id: "list-43242342424",
  //       name: "terror",
  //       completed: false,
  //     }

  //     component.deleteTask(s)

  //     expect(component.tasks).toEqual([])
  //   })
  // });


  // it('should onKey', () => {
  //   const event = { target: { value:'rwrewrrew'}};
  //   component..name = event.target.value
  //   component.onKey(event)

  //   expect(component..name).toEqual(event.target.value)
  // })



  // it('addStatus', () => {
  //   const event = { target: { checked:true}};
  //   // const tasksx = spyOn(component, "addTask").and.returnValue(tasks)
  //   const ttask = new Todolist(`list-${Math.random()}`,'dasd', false)

  //   component.addStatus(ttask , event)
  //   expect(tasks).toBe("", "", 2)

  // })




});
