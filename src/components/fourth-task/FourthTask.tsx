import { useEffect, useState } from "react";

type UserAnswers = {
  id: number;
  userAnswerOnQuethion: string;
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

const FourthTask = () => {
  const [activeQuethionIndex, setActiveQuethionIndex] = useState<number>(0);
  const [testSubmit, setTestSubmite] = useState<boolean>(false);
  const [userAnswers, setUserAnswers] = useState<UserAnswers[]>([]);
  const toNextQuetion = () => {
    if (activeQuethionIndex < tests.length - 1)
      setActiveQuethionIndex(activeQuethionIndex + 1);
  };
  const toPrevQuetion = () => {
    if (activeQuethionIndex >= 1) {
      setActiveQuethionIndex(activeQuethionIndex - 1);
    }
  };
  const takeUserAnswer = (
    event: React.ChangeEvent<HTMLInputElement>,
    id: number
  ) => {
    const value = event.target.value;
    const copyUserAnswers = [...userAnswers];
    const findIndex = copyUserAnswers.findIndex((item) => item.id === id);
    if (findIndex !== -1) {
      copyUserAnswers[findIndex].userAnswerOnQuethion = value;
      setUserAnswers(copyUserAnswers);
      console.log(copyUserAnswers);
    }
  };
  const chekAndEndTest = () => {
    const copyOfuserAnswers = [...userAnswers];
    tests.forEach((quethion) => {
      const findIndex = copyOfuserAnswers.findIndex(
        (item) => item.id === quethion.id
      );
      if (findIndex !== -1) {
        if (
          copyOfuserAnswers[findIndex].userAnswerOnQuethion ===
          quethion.answers[quethion.right - 1]
        ) {
          copyOfuserAnswers[findIndex].isCorect = true;
          setUserAnswers(copyOfuserAnswers);
        }
      }
      return;
    });
    setTestSubmite(true);
  };
  useEffect(() => {
    const innitUserAnswers = tests.map((quethion) => ({
      id: quethion.id,
      userAnswerOnQuethion: "",
      isCorect: false,
    }));
    setUserAnswers(innitUserAnswers);
    console.log(innitUserAnswers);
  }, []);
  if (testSubmit) {
    return (
      <div>
        {tests.map((question, index) => (
          <div key={question.id}>
            <div>{question.question}</div>
            {userAnswers[index].isCorect ? (
              <div className="text-lime-500">
                {`Ваша відповідь: ${question.answers[question.right - 1]} правильна`}
              </div>
            ) : (
              <div className="text-red-500">
                {`Ваша відповідь: ${userAnswers[index].userAnswerOnQuethion} неправильна, правильна відповідь: ${question.answers[Number(question.right)]}`}
              </div>
            )}
          </div>
        ))}
      </div>
    );
  }
  if (!testSubmit) {
    return (
      <div>
        <div>{tests[activeQuethionIndex].question}</div>

        {tests.map((queshion) => {
          const answers = queshion.answers;
          if (queshion.id === activeQuethionIndex + 1)
            return (
              <div className="flex flex-col gap-2" key={queshion.id}>
                {userAnswers[activeQuethionIndex] &&
                  answers.map((item, index) => (
                    <label key={index}>
                      <input
                        value={item}
                        type="radio"
                        name="userAnswer"
                        onChange={(event) => takeUserAnswer(event, queshion.id)}
                      />
                      {item}
                    </label>
                  ))}
              </div>
            );
        })}

        {activeQuethionIndex == tests.length - 1 && (
          <button
            className="bg-lime-600 border rounded-md mt-2"
            onClick={chekAndEndTest}
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
      </div>
    );
  }
  {
    return (
      <div>
        {tests.map((question, index) => (
          <div key={question.id}>
            <div>{question.question}</div>
            {userAnswers[index].isCorect ? (
              <div className="text-lime-500">
                {`Ваша відповідь: ${question.answers} правильна`}
              </div>
            ) : (
              <div className="text-red-500">
                Ваша відповідь: {userAnswers[question.id].userAnswerOnQuethion}
                неправильна, правильна відповідь:
                {question.answers[Number(question.right)]}
              </div>
            )}
          </div>
        ))}
      </div>
    );
  }
};

export default FourthTask;
