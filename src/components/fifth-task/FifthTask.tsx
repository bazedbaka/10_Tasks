import { useEffect, useState } from "react";

type UserAnswers = {
  id: number;
  userAnswerOnQuethion: number[];
  isCorect: boolean;
};

/* interface ChekBoxProps {
  label: string;
  checkHangle: () => void;
} */

type Quethions = {
  question: string;
  answers: string[];
  right: number[];
  id: number;
};

const quethions: Quethions[] = [
  {
    question: "Як ще називають сонце?",
    answers: ["Зірка", "Горох", "Сонечко", "Сіріус", "Кабабака"],
    right: [1, 3],
    id: 1,
  },
  {
    question:
      "Какая формула в физике используеться для нахождения силы тяжести?",
    answers: ["F = m*g", "F = m*a", "F = -k*x", "A = F*S", "N = A/t"],
    right: [1, 3],
    id: 2,
  },
  {
    question: "Які букви  є в слові Оса",
    answers: ["О", "С", "А", "П"],
    right: [1, 2, 3],
    id: 3,
  },
];

const FifthTask = () => {
  const [userAnswers, setUserAnswers] = useState<UserAnswers[]>([]);
  const [activeQuethionIndex, setActiveQuethionIndex] = useState<number>(0);
  const [testSubmit, setTestSubmite] = useState<boolean>(false);

  const toNextQuetion = () => {
    if (activeQuethionIndex < quethions.length - 1)
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
    const value = Number(event.target.value);
    const copyUserAnswers = [...userAnswers];
    const findIndex = copyUserAnswers.findIndex((item) => item.id === id);
    if (findIndex !== -1) {
      if (copyUserAnswers[findIndex].userAnswerOnQuethion.includes(value)) {
        copyUserAnswers[findIndex].userAnswerOnQuethion = copyUserAnswers[
          findIndex
        ].userAnswerOnQuethion.filter((answer) => answer !== value);
      } else {
        copyUserAnswers[findIndex].userAnswerOnQuethion.push(value);
      }
      setUserAnswers(copyUserAnswers);
      console.log(copyUserAnswers);
    }
  };

  const chekAndEndTest = () => {
    const copyOfuserAnswers = [...userAnswers];
    quethions.forEach((quethion) => {
      const findIndex = copyOfuserAnswers.findIndex(
        (item) => item.id === quethion.id
      );
      if (findIndex !== -1) {
        if (
          JSON.stringify(quethion.right) ===
          JSON.stringify(copyOfuserAnswers[findIndex].userAnswerOnQuethion)
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
    const innitUserAnswers = quethions.map((quethion) => ({
      id: quethion.id,
      userAnswerOnQuethion: [],
      isCorect: false,
    }));
    setUserAnswers(innitUserAnswers);
    console.log(innitUserAnswers);
  }, []);
  if (!testSubmit) {
    return (
      <>
        <div className="mt-7">{quethions[activeQuethionIndex].question}</div>

        <div className="flex flex-col gap-2 mr-7">
          {userAnswers[activeQuethionIndex] &&
            quethions[activeQuethionIndex].answers.map((item, index) => (
              <label key={index}>
                <input
                  value={index + 1}
                  checked={userAnswers[
                    activeQuethionIndex
                  ].userAnswerOnQuethion.includes(index + 1)}
                  type="checkbox"
                  name="userAnswer"
                  onChange={(event) =>
                    takeUserAnswer(event, quethions[activeQuethionIndex].id)
                  }
                />
                {item}
              </label>
            ))}

          {activeQuethionIndex == quethions.length - 1 && (
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
      </>
    );
  }
  {
    return (
      <div className="">
        {quethions.map((question, index) => (
          <div className="m-5" key={question.id}>
            <div>{question.question}</div>
            {userAnswers[index].isCorect ? (
              <div className="text-lime-500">
                {`Ваша відповідь: ${question.right} правильна`}
              </div>
            ) : (
              <div className="text-red-500">
                {` Ваша відповідь: ${userAnswers[index].userAnswerOnQuethion} неправильна, правильна відповідь: ${question.right}`}
              </div>
            )}
          </div>
        ))}
      </div>
    );
  }
};
export default FifthTask;
