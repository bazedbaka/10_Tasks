import { useState } from "react";
import WorkerItem from "./WorkerItem";

type Worker = {
  id: number;
  name: string;
  lastName: string;
  daysOnWork: number;
  paidForDay: number;
};

const workersList: Worker[] = [
  {
    id: 1,
    name: "Alex",
    lastName: "Miner",
    daysOnWork: 50,
    paidForDay: 6,
  },
  {
    id: 2,
    name: "Oleg",
    lastName: "Ponoche",
    daysOnWork: 200,
    paidForDay: 4,
  },
  {
    id: 3,
    name: "Kostik",
    lastName: "Negoda",
    daysOnWork: 64,
    paidForDay: 5,
  },
];

const FirstTask = () => {
  const [workers, setWorkers] = useState(workersList);

  const sumOfSalary = workers.reduce(
    (sum, worker) => sum + worker.paidForDay * worker.daysOnWork,
    0
  );
  const handleChange = (
    id: number,
    value: number,
    field: "daysOnWork" | "paidForDay"
  ) => {
    const copyWorkers = [...workers].map((worker) => {
      if (worker.id === id) {
        return {
          ...worker,
          [field]: value,
        };
      }
      return {
        ...worker,
      };
    });
    setWorkers(copyWorkers);
  };
  return (
    <>
      <div className="flex ">
        <table className="border m-[50px] text-slate-50 ">
          <thead>
            <tr>
              <th className="border" scope="col">
                Ім'я
              </th>
              <th className="border" scope="col">
                Фамілія
              </th>
              <th className="border" scope="col">
                Днів на роботі
              </th>
              <th className="border" scope="col">
                Ставка за день
              </th>
              <th className="border" scope="col">
                Оплата
              </th>
            </tr>
          </thead>
          <tbody>
            {workers.map((worker) => (
              <WorkerItem
                key={worker.id}
                {...worker}
                onUpdate={handleChange}
                salary={worker.daysOnWork * worker.paidForDay}
              />
            ))}
          </tbody>
          <tfoot className="border  text-slate-50">
            <tr className="border  text-slate-50">
              <th scope="row">Загальна зарплатня:</th>
              <td className="text-center" scope="col" colSpan={5}>
                {sumOfSalary}
              </td>
            </tr>
          </tfoot>
        </table>
        <div>
          <div className=" text-slate-50 mt-12">Описа завдання:</div>
          <div className=" text-slate-50">
            Дан стейт внутри которого массив с работниками. У каждого работника
            есть имя, фамилия, количество отработанных дней и зарплатная ставка
            за день. Выведи этих работников на экран в виде таблицы. Сделай так,
            чтобы в последней колонке автоматически рассчитывалась зарплата
            работника (количество отработанных дней умножить на ставку). Сделай
            так, чтобы количество дней и ставка выводились в виде инпутов. Если
            поредактировать эти инпуты - зарплата также должна поменяться. Под
            таблицей также выведи суммарную зарплату всех работников.
          </div>
        </div>
      </div>
    </>
  );
};
export default FirstTask;
