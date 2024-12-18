import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { taskList } from "../../utils/constans";
import { Task } from "../../utils/constans";

const TaskPage = () => {
  const params: { taskId?: string } = useParams();

  const navigate = useNavigate();

  const [activeTask, setActiveTask] = useState<Task | null>(null);

  const goToNextTask = () => {
    const findIndex = taskList.findIndex(
      (item) => item.number === activeTask?.number
    );

    if (findIndex !== -1) {
      if (findIndex + 1 < taskList.length) {
        navigate(`/task/${taskList[findIndex + 1].number}`);
      }
    }
  };

  const goToBackTask = () => {
    const findIndex = taskList.findIndex(
      (item) => item.number === activeTask?.number
    );

    if (findIndex !== -1) {
      if (findIndex - 1 >= 0) {
        navigate(`/task/${taskList[findIndex - 1].number}`);
      }
    }
  };

  useEffect(() => {
    const taskId = Number(params.taskId);
    const curentTask = taskList.find((item) => item.number === taskId);
    if (curentTask) {
      setActiveTask(curentTask);
    }
  }, [setActiveTask, params.taskId]);

  return (
    <div>
      {activeTask?.task}
      <div className="flex gap-5 justify-center items-center mt-52">
        <button
          className="border bg-black w-[150px] h-14 "
          onClick={goToBackTask}
        >
          Back
        </button>
        <button
          className=" border bg-black w-[150px] h-14"
          onClick={goToNextTask}
        >
          Next
        </button>
      </div>
    </div>
  );
};
export default TaskPage;
