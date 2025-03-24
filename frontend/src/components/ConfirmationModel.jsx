import React from "react";
import { IoMdClose } from "react-icons/io";

const ConfirmationModel = ({ close, cancel, confirm }) => {
  return (
    <>
      <div className="fixed top-0 bottom-0 right-0 left-0 z-100 bg-black/50 p-2 flex justify-center items-center">
        <div className="bg-white min-w-sm p-4 rounded flex flex-col relative">
          <div className="absolute top-2 right-2">
            <button
              onClick={close}
              className="bg-red-500 hover:bg-red-600 p-2 rounded-full text-white cursor-pointer"
            >
              <IoMdClose />
            </button>
          </div>
          <div>
            <h2 className="text-2xl font-semibold mb-4">Confirmation</h2>
            <p className="text-gray-600 mb-4">Are you sure you want to delete?</p>
            <div className="flex gap-4 justify-end">
              <button
                onClick={cancel}
                className="bg-gray-500 hover:bg-gray-600 cursor-pointer text-white py-2 px-4 rounded"
              >
                Cancel
              </button>
              <button
                onClick={confirm}
                className="bg-red-500 hover:bg-red-600 cursor-pointer text-white py-2 px-4 rounded"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ConfirmationModel;
