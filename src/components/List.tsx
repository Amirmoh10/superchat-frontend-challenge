import { NumberItem } from "../App";

type ListProps = {
  listOfNumbers: NumberItem[];
  onItemSelect: (number: number) => void;
};

export default function List({ listOfNumbers, onItemSelect }: ListProps) {
  return (
    <ul className="w-full flex-grow">
      {listOfNumbers.map(({ number, checked }) => (
        <li
          className="px-10 py-2 border-b border-gray-200 w-full rounded-t-lg flex gap-6 justify-between"
          key={number}
        >
          {number}
          <input
            className="form-check-input h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
            type="checkbox"
            checked={checked}
            onChange={() => onItemSelect(number)}
          />
        </li>
      ))}
    </ul>
  );
}
