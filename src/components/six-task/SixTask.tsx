import React from "react";
import { useState } from "react";

type ToDoList = {
  id: number;
  task: string;
  isComplete: boolean;
  isEditNow: boolean;
};

const toDoList = [
  {
    id: 1,
    task: "Помити посуд",
    isComplete: false,
    isEditNow: false,
  },
  {
    id: 2,
    task: "Прибрати",
    isComplete: false,
    isEditNow: false,
  },
];

const SixTask = () => {
  const [tasks, setTasks] = useState<ToDoList[]>(toDoList);
  const [newTask, setNewTask] = useState("");

  //const [isEditNow, setIsEditNow] = useState("");
  const setANewTask = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTask(event.target.value);
  };

  const saveChanges = (id: number) => {
    const copyOfTasks = [...tasks];
    const findIndex = copyOfTasks.findIndex((task) => task.id === id);
    if (findIndex !== -1) {
      copyOfTasks[findIndex].isEditNow = !copyOfTasks[findIndex].isEditNow;
      setTasks(copyOfTasks);
    }
  };

  const changeTaskValue = (
    event: React.ChangeEvent<HTMLInputElement>,
    id: number
  ) => {
    const value = event.target.value;
    const copyOfTasks = [...tasks];
    const findIndex = copyOfTasks.findIndex((task) => task.id === id);
    if (findIndex !== -1) {
      copyOfTasks[findIndex].task = value;
      setTasks(copyOfTasks);
    }
  };
  const CompliteTask = (id: number) => {
    const copyOfTasks = [...tasks];
    const findIndex = copyOfTasks.findIndex((task) => task.id === id);
    if (findIndex !== -1) {
      copyOfTasks[findIndex].isComplete = !copyOfTasks[findIndex].isComplete;
      setTasks(copyOfTasks);
    }
  };
  //const editTask = () => {};
  const AddTaskToList = () => {
    if (!newTask.length) {
      return;
    }
    const idForTask = Date.now();
    const copyOfTasks = [...tasks];
    copyOfTasks.push({
      id: /* copyOfTasks.length + 1 */ idForTask,
      task: newTask,
      isComplete: false,
      isEditNow: false,
    });
    console.log(copyOfTasks);
    setTasks(copyOfTasks);
    setNewTask("");
  };

  const delTaskFromList = (id: number) => {
    const copyOfNewTasks = tasks.filter((tasks) => tasks.id !== id);
    setTasks(copyOfNewTasks);
  };

  return (
    <>
      <h2 className="text-center mb-3 text-xl">Список справ</h2>
      <div className=" flex justify-center flex-col items-center gap-5">
        <input
          className="text-black"
          type="text"
          value={newTask}
          onChange={setANewTask}
        />
        <button
          className="border bg-purple-600 rounded-2xl"
          onClick={AddTaskToList}
        >
          Додати до списку
        </button>
      </div>
      <div className="flex flex-col gap-6 items-center border mt-10">
        {tasks.map((task) => {
          if (!task.isEditNow) {
            return (
              <React.Fragment key={task.task}>
                <div className="flex  border rounded-2xl justify-around gap-7">
                  <input
                    type="checkbox"
                    checked={task.isComplete}
                    onChange={() => CompliteTask(task.id)}
                  />
                  <div
                    className={
                      task.isComplete ? "line-through text-xl" : "text-xl"
                    }
                  >
                    {task.task}
                  </div>
                  <button
                    className="border bg-lime-600"
                    onClick={() => saveChanges(task.id)}
                  >
                    Edit
                  </button>
                  <button
                    className="border bg-red-600"
                    onClick={() => delTaskFromList(task.id)}
                  >
                    Del
                  </button>
                </div>
              </React.Fragment>
            );
          } else {
            return (
              <React.Fragment key={task.id}>
                <div className="flex gap-3">
                  <input
                    className="text-black"
                    type="text"
                    value={task.task}
                    onChange={(e) => changeTaskValue(e, task.id)}
                  />
                  <button onClick={() => saveChanges(task.id)}>Save</button>
                </div>
              </React.Fragment>
            );
          }
        })}
      </div>
    </>
  );
};

export default SixTask;
