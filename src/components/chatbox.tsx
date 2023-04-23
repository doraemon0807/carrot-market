export default function Chatbox() {
  return (
    <div className="fixed inset-x-0 bottom-0 mx-auto w-full max-w-xl bg-white px-4 py-2">
      <div className="relative flex items-center">
        <input
          className="w-full rounded-full border-gray-300 pr-11 shadow-sm focus:border-orange-500 focus:outline-none focus:ring-orange-500"
          type="text"
        />
        <div className="absolute inset-y-0 right-0 flex py-1.5 pr-1.5">
          <button className="flex items-center rounded-full bg-orange-500 px-2 pb-1 text-sm font-semibold text-white hover:bg-orange-600 focus:ring-2 focus:ring-orange-500 focus:ring-offset-2">
            &rarr;
          </button>
        </div>
      </div>
    </div>
  );
}
