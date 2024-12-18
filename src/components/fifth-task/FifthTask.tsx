import { useState } from "react";

const ChekBox = ({ isCheked, label, checkHangle }) => {
  return (
    <div>
      <input
        type="checkbox"
        id="checkbox"
        value={isCheked}
        onChange={checkHangle}
      />
      <label htmlFor="checkbox">{label}</label>
    </div>
  );
};

const quethions = [
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

const FifthTask = () => {
  const [isCheked, setIsCheked] = useState(false);
  const onHandleChange = () => {
    setIsCheked(!isCheked);
  };
  return (
    <>
      <div>hello 5</div>
      <ChekBox
        isCheked={isCheked}
        label={"I pushh this button"}
        checkHangle={onHandleChange}
      />
    </>
  );
};
export default FifthTask;
