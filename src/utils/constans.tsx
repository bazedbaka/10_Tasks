import { ReactNode } from "react";
import FirstTask from "../components/first-task/FirstTask";
import SecondTask from "../components/second-task/SecondTask";
import { ThirdTask } from "../components/third-task/ThirdTask";
import { NewThirdTask } from "../components/third-task-another/NewThirdTask";
import FourthTask from "../components/fourth-task/FourthTask";
import FifthTask from "../components/fifth-task/FifthTask";

export type Task = {
  number: number;
  task: ReactNode; //якщо компонет хоч передать
};

export const taskList = [
  {
    number: 1,
    task: <FirstTask />,
  },
  {
    number: 2,
    task: <SecondTask />,
  },
  {
    number: 3,
    task: <ThirdTask />,
  },
  {
    number: 4,
    task: <NewThirdTask />,
  },
  {
    number: 5,
    task: <FourthTask />,
  },

  {
    number: 6,
    task: <FifthTask />,
  },
];
