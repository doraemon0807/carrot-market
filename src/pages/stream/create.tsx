import type { NextPage } from "next";

const Create: NextPage = () => {
  return (
    <div className="px-4 py-10">
      <div className="">
        <label
          htmlFor="name"
          className="mb-1 block text-sm font-medium text-gray-700"
        >
          Name
        </label>
        <div className="relative flex items-center rounded-md shadow-sm">
          <input
            className="w-full appearance-none rounded-md border-gray-300 py-2 placeholder-gray-400 shadow-sm focus:border-orange-500 focus:outline-none  focus:ring-orange-500"
            id="name"
            type="text"
          />
        </div>
      </div>
      <div className="my-5">
        <label
          htmlFor="price"
          className="mb-1 block text-sm font-medium text-gray-700"
        >
          Price
        </label>
        <div className="relative flex items-center rounded-md shadow-sm">
          <div className="absolute left-0 flex items-center justify-center pl-3">
            <span className="pointer-events-none select-none text-sm text-gray-500">
              $
            </span>
          </div>
          <input
            className="w-full appearance-none rounded-md border-gray-300 px-3 py-2 pl-7 placeholder-gray-400 shadow-sm focus:border-orange-500 focus:outline-none  focus:ring-orange-500"
            id="price"
            type="text"
            placeholder="0.00"
          />
          <div className="absolute right-0 flex items-center pr-3">
            <span className="pointer-events-none select-none text-sm text-gray-500">
              USD
            </span>
          </div>
        </div>
      </div>
      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700">
          Description
        </label>
        <textarea
          className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:outline-none focus:ring-orange-500"
          rows={4}
        />
      </div>
      <button className="mt-5 w-full rounded-md border border-transparent bg-orange-500 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2">
        Start Streaming
      </button>
    </div>
  );
};

export default Create;
