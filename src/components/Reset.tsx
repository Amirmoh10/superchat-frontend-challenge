import { ReactComponent as Logo } from "../icons/reset.svg";

type ResetProps = {
  onReset: () => void;
};

export default function Reset({ onReset }: ResetProps) {
  return (
    <div className="flex flex-col items-end gap-1 w-full">
      <label htmlFor="resetButton" className="text-base font-normal">
        Reset
      </label>
      <button id="resetButton" onClick={onReset}>
        <Logo />
      </button>
    </div>
  );
}
