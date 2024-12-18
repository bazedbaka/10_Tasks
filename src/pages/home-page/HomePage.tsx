import { useEffect } from "react";
import { taskList } from "../../utils/constans";
import { useNavigate } from "react-router";

const HomePage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const firstTask = taskList[0];

    navigate(`/task/${firstTask.number}`);
  }, [navigate]);
  return <div>Helllo Home!!</div>;
};

export default HomePage;
