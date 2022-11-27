import React from "react";
import Button from "./Button";

type DialogProps = {
  shouldShowDialog: boolean;
  onDelete: () => void;
  onClose: () => void;
};

export default function Dialog({
  shouldShowDialog,
  onDelete,
  onClose,
}: DialogProps) {
  React.useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        onClose();
      }
    }

    window.addEventListener("keydown", onKeyDown);

    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return shouldShowDialog ? (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-auto my-6 mx-auto max-w-3xl">
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
              <h3 className="text-3xl font-semibold">Delete Confirmation</h3>
            </div>
            <div className="relative p-6 flex-auto">
              <p className="my-4 text-slate-500 text-lg leading-relaxed">
                Please confirm that you want to delete the selected number(s).
              </p>
            </div>
            <div className="flex items-center justify-end gap-6 p-6 border-t border-solid border-slate-200 rounded-b">
              <Button variant="secondary" onClick={onClose}>
                Close
              </Button>
              <Button
                onClick={() => {
                  onClose();
                  onDelete();
                }}
              >
                Confirm
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  ) : null;
}
