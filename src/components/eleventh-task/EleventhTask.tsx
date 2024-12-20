import { useState } from "react";

const EleventhTask = () => {
  const [inputValue, setInputValue] = useState<string>("");

  const setNewValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value.replace(/\s+/g, "");

    setInputValue(newValue);
  };

  const borderOfInput =
    inputValue.length >= 4 && inputValue.length <= 9
      ? "text-green-500 border-green-500"
      : "text-red-600 border-red-600";

  return (
    <div className="flex justify-center items-center mt-48">
      <input
        placeholder="Ваш текст"
        className={` border-4
          ${borderOfInput}
          focus:outline-none
        `}
        type="text"
        value={inputValue}
        onChange={(event) => setNewValue(event)}
      />
    </div>
  );
};

export default EleventhTask;
