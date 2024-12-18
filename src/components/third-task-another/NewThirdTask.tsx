import React from "react";
import { useEffect, useState } from "react";

type UserAnswers = {
  id: number;
  userAnswer: string;
  isCorect: boolean;
};
type Tests = {
  question: string;
  answers: string[];
  right: number;
  id: number;
};
const tests: Tests[] = [
  {
    question: "В каком году началась Вторамя мировая война?",
    answers: ["1941", "1937", "1940", "1939", "1938"],
    right: 4,
    id: 1,
  },
  {
    question:
      "Какая формула в физике используеться для нахождения силы тяжести?",
    answers: ["F = m*g", "F = m*a", "F = -k*x", "A = F*S", "N = A/t"],
    right: 1,
    id: 2,
  },
  {
    question: "Скільки букв в слові Оса",
    answers: ["1", "16", "7", "3", "4", "18", "19"],
    right: 4,
    id: 3,
  },
];
export const NewThirdTask = () => {
  const [activeQuethionIndex, setActiveQuethionIndex] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<UserAnswers[]>([]);
  const [testSubmit, setTestSubmite] = useState<boolean>(false);

  const toNextQuetion = () => {
    if (activeQuethionIndex < tests.length - 1)
      setActiveQuethionIndex(activeQuethionIndex + 1);
  };
  const toPrevQuetion = () => {
    if (activeQuethionIndex >= 1) {
      setActiveQuethionIndex(activeQuethionIndex - 1);
    }
  };

  const handleChangeAnswer = (
    event: React.ChangeEvent<HTMLInputElement>,
    id: number,
    answers: string[]
  ) => {
    const value = event.target.value.replace(/^0/, "");
    if (!/((^[1-9][0-9]*$)|(^[0-9]$))/g.test(value) && value) {
      return;
    }
    const copyAnswers = [...userAnswers];
    if (answers.length < Number(value)) {
      return alert(`Схоже ви намагаєтесь ввести відповідь якої не існує`);
    } else {
      const findIndex = copyAnswers.findIndex((item) => item.id === id);
      if (findIndex !== -1) {
        copyAnswers[findIndex].userAnswer = value;
        setUserAnswers(copyAnswers);
      }
    }
  };

  const chekAndEndTest = () => {
    const copyAnswers = [...userAnswers];
    tests.forEach((queshion) => {
      const findIndex = copyAnswers.findIndex(
        (item) => item.id === queshion.id
      );
      if (copyAnswers[findIndex].userAnswer === String(queshion.right)) {
        copyAnswers[findIndex].isCorect = true;
        setUserAnswers(copyAnswers);
      }
    });
    setTestSubmite(true);
  };

  useEffect(() => {
    const initUserAnswers = tests.map((queshion) => ({
      id: queshion.id,
      userAnswer: "",
      isCorect: false,
    }));
    setUserAnswers(initUserAnswers);
  }, []);
  if (testSubmit) {
    return (
      <div>
        {tests.map((question, index) => (
          <div key={question.id}>
            <div>{question.question}</div>
            {userAnswers[index].isCorect ? (
              <div className="text-lime-500">
                {`Ваша відповідь: ${question.answers[Number(userAnswers[index].userAnswer)]} правильна`}
              </div>
            ) : (
              <div className="text-red-500">
                Ваша відповідь:{" "}
                {question.answers[Number(userAnswers[index].userAnswer)]}
                неправильна, правильна відповідь:
                {question.answers[Number(question.right)]}
              </div>
            )}
          </div>
        ))}
      </div>
    );
  }
  return (
    <div>
      {tests.map((queshion) => {
        const answers = queshion.answers;
        if (queshion.id === activeQuethionIndex + 1)
          return (
            <React.Fragment key={queshion.id}>
              <div>{queshion.question}</div>
              <div>
                <ol>
                  {answers.map((item, index) => (
                    <li key={item}>
                      {index + 1}. {item}
                    </li>
                  ))}
                </ol>
                {userAnswers[activeQuethionIndex] && (
                  <input
                    key={activeQuethionIndex}
                    className="w-44 text-black"
                    type="text"
                    value={userAnswers[activeQuethionIndex].userAnswer}
                    onChange={(event) => {
                      handleChangeAnswer(event, queshion.id, queshion.answers);
                    }}
                  />
                )}
                {}
              </div>
            </React.Fragment>
          );
      })}

      {activeQuethionIndex == tests.length - 1 && (
        <button
          onClick={chekAndEndTest}
          className="bg-lime-600 border rounded-md mt-2"
          //onClick={chekAndEndTest}
        >
          Перевірити
        </button>
      )}
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
      {/* {tests.map((testItem) => {
        if (testItem.id === answerOnQuethions[activQuethionIndex].id) {
          return (
            <div>
              {answerOnQuethions[activQuethionIndex].answers.map((answer) => {
                return <div>{answer}</div>;
              })}
            </div>
          );
        }
      })} */}
    </div>
  );
};
