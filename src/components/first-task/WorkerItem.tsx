import { useState } from "react";

type Props = {
  id: number;
  name: string;
  lastName: string;
  daysOnWork: number;
  paidForDay: number;
  onUpdate: (
    id: number,
    value: number,
    field: "daysOnWork" | "paidForDay"
  ) => void;
  salary: number;
};

const WorkerItem = ({
  id,
  name,
  lastName,
  daysOnWork,
  paidForDay,
  onUpdate,
  salary,
}: Props) => {
  const [isEditableFields, setIsEditableFields] = useState(false);

  const handleChange = (
    id: number,
    value: string,
    field: "daysOnWork" | "paidForDay"
  ) => {
    const newValue = value.replace(/^0/, "");
    if (!/((^[1-9][0-9]*$)|(^[0-9]$))/g.test(newValue) && newValue) {
      return;
    }
    onUpdate(id, Number(newValue), field);
  };

  return (
    <tr className="border  text-slate-50" key={id}>
      <td>{name}</td>
      <td>{lastName}</td>
      <td>
        <input
          className=" text-zinc-900 "
          value={daysOnWork}
          disabled={!isEditableFields}
          onChange={(e) => handleChange(id, e.target.value, "daysOnWork")}
        />
      </td>
      <td>
        <input
          className=" text-zinc-900 "
          value={paidForDay}
          disabled={!isEditableFields}
          onChange={(e) => handleChange(id, e.target.value, "paidForDay")}
        />
      </td>
      <td>{salary}</td>
      <td>
        <button onClick={() => setIsEditableFields(!isEditableFields)}>
          {isEditableFields ? "Off" : "On"}
        </button>
      </td>
    </tr>
  );
};
export default WorkerItem;
