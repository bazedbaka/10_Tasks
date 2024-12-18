import { useEffect, useState } from "react";

type Test = {
  id: number;
  question: string;
  answer: string;
  right: number;
};

type Answer = {
  id: number;
  answer: string;
  isTrue: boolean;
};

const test: Test[] = [
  {
    id: 1,
    question: "В каком году началась Вторая мировая война?",
    answer: "1939",
    right: 4,
  },
  {
    id: 2,
    question: "Сколько материков на Земле?",
    answer: "7",
    right: 2,
  },
  {
    id: 3,
    question: "Сколько букв в слове ОСА",
    answer: "3",
    right: 4,
  },
];

export const ThirdTask = () => {
  const [answersList, setAnswersList] = useState<Answer[]>([]);
  const [submitTest, setSubmitTest] = useState(false);
  const [activQuethionIndex, setActiveQuethionIndex] = useState<number>(0);

  const saveUserInput = (
    event: React.ChangeEvent<HTMLInputElement>,
    answerId: number
  ) => {
    const value = event.target.value;
    const copyAnswersList = [...answersList];

    const findIndex = copyAnswersList.findIndex((item) => item.id == answerId);
    if (findIndex !== -1) {
      copyAnswersList[findIndex].answer = value;
      setAnswersList(copyAnswersList);
    }
  };
  const toNextQuetion = () => {
    if (activQuethionIndex < test.length - 1)
      setActiveQuethionIndex(activQuethionIndex + 1);
  };
  const toPrevQuetion = () => {
    if (activQuethionIndex >= 1) {
      setActiveQuethionIndex(activQuethionIndex - 1);
    }
  };

  const chekAndEndTest = () => {
    const copyAnswers = [...answersList];
    test.forEach((queshion) => {
      const findIndex = copyAnswers.findIndex(
        (item) => item.id === queshion.id
      );
      if (
        findIndex !== -1 &&
        copyAnswers[findIndex].answer === queshion.answer
      ) {
        copyAnswers[findIndex].isTrue = true;
      }
    });
    setAnswersList(copyAnswers);
    setSubmitTest(true);
    console.log(answersList);
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
    const initAnswers = test.map((quethion) => ({
      id: quethion.id,
      answer: "",
      isTrue: false,
    }));
    console.log("!corect");
    setAnswersList(initAnswers);
  }, []);

  return (
    <>
      <div className="flex m-3 flex-col justify-center items-center">
        <div>{!submitTest && test[activQuethionIndex].question}</div>
        {test.map((queshion) => {
          const answer = answersList.find((item) => item.id === queshion.id);
          if (answer?.id == activQuethionIndex + 1 && !submitTest) {
            return (
              <input
                key={answer?.id}
                className="w-44 text-black"
                type="text"
                value={answer?.answer}
                onChange={(event) =>
                  saveUserInput(event, answersList[activQuethionIndex].id)
                }
              />
            );
          }
        })}

        {submitTest && (
          <div>
            {test.map((queshion) => {
              const answer = answersList.find(
                (item) => (item.id = queshion.id)
              );
              return (
                <>
                  <div key={queshion.id}>{queshion.question}</div>
                  <div
                    className={
                      answer?.isTrue ? "text-lime-400" : "text-red-700"
                    }
                  >
                    {questionResult(
                      answersList[queshion.id - 1].isTrue,
                      answersList[queshion.id - 1].answer,
                      queshion.answer
                    )}
                  </div>
                </>
              );
            })}
          </div>
        )}
        {activQuethionIndex == test.length - 1 && (
          <button
            className="bg-lime-600 border rounded-md mt-2"
            onClick={chekAndEndTest}
          >
            Перевірити
          </button>
        )}
      </div>

      {!submitTest && (
        <div className="flex gap-10 justify-center items-center">
          <button
            className="border rounded-md bg-slate-500"
            onClick={toPrevQuetion}
          >
            Попереднє
          </button>
          <button
            className="border rounded-md bg-slate-500"
            onClick={toNextQuetion}
          >
            Наступне
          </button>
        </div>
      )}
    </>
  );
};
