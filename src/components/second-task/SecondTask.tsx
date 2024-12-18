import { useEffect, useState } from "react";

type Quiz = {
  id: number;
  title: string;
  corectAnswer: string;
};
type Answer = {
  id: number;
  answer: string;
  isRight: boolean;
};

const quiz: Quiz[] = [
  {
    id: 1,
    title: "Скільки днів у грудні?",
    corectAnswer: "31",
  },
  {
    id: 2,
    title: "Хто гавкає?",
    corectAnswer: "Собака",
  },
  {
    id: 3,
    title: "Де ви проживаєте?",
    corectAnswer: "Черкаси",
  },
];

const SecondTask = () => {
  const [answers, setAnswers] = useState<Answer[]>([]);

  const [isSubmit, setIsSubmit] = useState(false);

  const handleChangeAnswer = (
    event: React.ChangeEvent<HTMLInputElement>,
    id: number
  ) => {
    const value = event.target.value;
    const copyAnswers = [...answers];

    const findIndex = copyAnswers.findIndex((item) => item.id === id);
    if (findIndex !== -1) {
      copyAnswers[findIndex].answer = value;
      setAnswers(copyAnswers);
    }
  };

  const endTest = () => {
    const copyAnswers = [...answers];
    quiz.forEach((queshion) => {
      const findIndex = copyAnswers.findIndex(
        (item) => item.id === queshion.id
      );
      if (
        findIndex !== -1 &&
        copyAnswers[findIndex].answer.toLowerCase() ===
          queshion.corectAnswer.toLowerCase()
      ) {
        copyAnswers[findIndex].isRight = true;
      }
    });
    setAnswers(copyAnswers);
    setIsSubmit(true);
  };

  const questionResult = (
    isCorect: boolean,
    curentAnsver: string,
    corectAnswer: string
  ) => {
    if (isCorect) {
      return `ваш ответ ${curentAnsver}, правильно`;
    }
    return `ваш ответ ${curentAnsver}, не правильно, правильный ответ ${corectAnswer} `;
  };

  useEffect(() => {
    const initAnswers = quiz.map((queshion) => ({
      id: queshion.id,
      answer: "",
      isRight: false,
    }));
    setAnswers(initAnswers);
  }, []);

  return (
    <div>
      {quiz.map((queshion) => {
        const answer = answers.find((item) => item.id === queshion.id);

        return (
          <div key={queshion.id}>
            <div>{queshion.title}</div>
            <div>
              {answer && !isSubmit && (
                <input
                  className=" text-black"
                  value={answer.answer}
                  onChange={(event) => {
                    handleChangeAnswer(event, answer.id);
                  }}
                />
              )}
              {answer && isSubmit && (
                <div
                  className={answer.isRight ? "text-lime-400" : "text-red-700"}
                >
                  {questionResult(
                    answer.isRight,
                    answer.answer,
                    queshion.corectAnswer
                  )}
                </div>
              )}
            </div>
          </div>
        );
      })}

      <button className="border-l-teal-700 m-2" onClick={endTest}>
        Перевірити
      </button>
    </div>
  );
};

export default SecondTask;
