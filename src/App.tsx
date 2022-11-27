import { useState } from "react";

import List from "./components/List";
import Button from "./components/Button";
import Alert from "./components/Alert";
import Reset from "./components/Reset";
import Dialog from "./components/Dialog";

export type NumberItem = {
  number: number;
  checked: boolean;
};

type Status = "idle" | "loading" | "error";

function generateItems() {
  const items: NumberItem[] = [];

  while (items.length < 10) {
    const randomNumber = Math.floor(Math.random() * 100) + 1;
    const isIncluded = !!items.find(({ number }) => number === randomNumber);
    if (!isIncluded) items.push({ number: randomNumber, checked: false });
  }

  return items;
}

function App() {
  const [listOfNumbers, setListOfNumbers] = useState(generateItems);
  const [shouldShowDialog, setShouldShowDialog] = useState(false);
  const [requestStatus, setRequestStatus] = useState<Status>("idle");

  const sumOfNumbers = listOfNumbers.reduce(
    (acc, item) => acc + item.number,
    0
  );

  function handleItemSelect(number: number) {
    const updatedList = listOfNumbers.map((item) =>
      item.number === number ? { ...item, checked: !item.checked } : item
    );

    setListOfNumbers(updatedList);
  }

  function handleDelete() {
    const filteredItems = listOfNumbers.filter((item) => item.checked !== true);

    setListOfNumbers(filteredItems);
  }

  function handleReset() {
    setRequestStatus("idle");

    const newList = generateItems();

    setListOfNumbers([...newList].sort());
  }

  async function sendSum() {
    setRequestStatus("loading");

    try {
      const response = await fetch(
        "http://superchat-challenge-numbers.free.beeceptor.com/sum",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(sumOfNumbers),
        }
      );

      if (!response.ok) {
        throw Error("error");
      }

      setRequestStatus("idle");
    } catch (error) {
      setRequestStatus("error");
    }
  }

  const noItemsChecked = !listOfNumbers.some((item) => item.checked);

  return (
    <>
      <Dialog
        shouldShowDialog={shouldShowDialog}
        onDelete={handleDelete}
        onClose={() => setShouldShowDialog(false)}
      />
      <div className="flex flex-col p-8 w-96 m-auto gap-3 text-gray-900">
        <Reset onReset={handleReset} />
        <div className="flex flex-col w-full bg-white rounded-lg border border-gray-200">
          <h1 className="text-lg text-center font-semibold py-2 px-2 border-b border-gray-200">
            Frontend Challenge
          </h1>
          <List listOfNumbers={listOfNumbers} onItemSelect={handleItemSelect} />
          <div className="text-base text-center font-normal px-10 py-2 border-b border-gray-200 mt">
            {`Sum of numbers: ${sumOfNumbers}`}
          </div>
          <div className="flex justify-between bg-gray-100 text-sm text-right py-4 px-5 rounded-b-lg">
            <Button
              variant="secondary"
              disabled={noItemsChecked}
              onClick={() => setShouldShowDialog(true)}
            >
              Delete
            </Button>
            <div className="w-36 grid">
              <Button onClick={sendSum} disabled={requestStatus === "loading"}>
                {requestStatus === "loading" ? "Submitting..." : "Submit sum"}
              </Button>
            </div>
          </div>
        </div>
        {requestStatus === "error" && <Alert />}
      </div>
    </>
  );
}

export default App;
