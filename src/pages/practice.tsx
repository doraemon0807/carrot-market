export default function Practice() {
  return (
    <div className="grid min-h-screen gap-5 bg-slate-400 px-20 py-20 md:grid-cols-2 xl:grid-cols-3 xl:place-content-center">
      <div className="flex flex-col justify-between rounded-3xl bg-white p-10 shadow-xl hover:bg-[url('/vercel.svg')] dark:bg-gray-700">
        <span className="mb-2 block text-3xl font-semibold dark:text-white">
          Select Item
        </span>
        <ul className="overflow-hidden rounded-md">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div className="flex items-center justify-between p-1 odd:bg-green-100 even:bg-blue-100 dark:odd:bg-green-900 dark:even:bg-blue-900">
              <span className="text-gray-700 dark:text-gray-200">
                Gray Chair
              </span>
              <span className="font-semibold dark:text-white">$19</span>
            </div>
          ))}
        </ul>
        <div className="mt-2 flex justify-between border-t-2 border-dashed pt-2">
          <span className="dark:text-white">Total</span>
          <span className="font-semibold dark:text-white">$100</span>
        </div>
        <button className="mx-auto mt-5 block w-1/2 rounded-xl bg-blue-500 p-3 text-center font-medium text-white hover:bg-teal-500 hover:text-black focus:bg-red-500 active:bg-yellow-500 dark:border-2 dark:border-white dark:bg-black dark:hover:border-black dark:hover:bg-gray-300 dark:hover:text-gray-800">
          Checkout
        </button>
      </div>
      <div className="group overflow-hidden rounded-3xl bg-white shadow-xl">
        <div className="portrait: bg-blue-500 p-6 pb-14 xl:pb-48 landscape:bg-teal-400">
          <span className="text-2xl text-white">Profile</span>
        </div>
        <div className="relative -top-5 rounded-3xl bg-white p-6">
          <div className="relative -top-16 flex items-end justify-between">
            <div className="flex flex-col items-center">
              <span className="text-sm text-gray-500">Orders</span>
              <span className="font-semibold">340</span>
            </div>
            <div className="h-24 w-24 rounded-full bg-red-400 transition-colors group-hover:bg-zinc-400" />
            <div className="flex flex-col items-center">
              <span className="text-sm text-gray-500">Spent</span>
              <span className="font-semibold">$2,310</span>
            </div>
          </div>
          <div className="relative -mb-5 -mt-14 flex flex-col items-center">
            <span className="text-lg font-medium">Tony Molloy</span>
            <span className="text-sm text-gray-500">New York, USA</span>
          </div>
        </div>
      </div>
      <div className="rounded-3xl bg-white p-10 shadow-xl md:col-span-2 xl:col-span-1">
        <div className="mb-5 flex items-center justify-between">
          <span>⬅️</span>
          <div className="space-x-3">
            <span>⭐️ 4.9</span>
            <span className="rounded-md p-2 shadow-xl">💖</span>
          </div>
        </div>

        <div className="mx-auto mb-5 aspect-square w-full bg-zinc-500" />

        <div className="flex flex-col">
          <span className="text-xl font-medium">Swoon Lounge</span>
          <span className="text-sm text-gray-500">Chair</span>
          <div className="mb-5 mt-3 flex items-center justify-between">
            <div className="space-x-3">
              <button className="h-5 w-5 rounded-full bg-yellow-500 bg-opacity-75 ring-yellow-500 ring-offset-2 transition focus:ring-2"></button>
              <button className="h-5 w-5 rounded-full bg-indigo-500 bg-opacity-75 ring-indigo-500 ring-offset-2 transition focus:ring-2"></button>
              <button className="h-5 w-5 rounded-full bg-teal-500 bg-opacity-75 ring-teal-500 ring-offset-2 transition focus:ring-2"></button>
            </div>
            <div className="flex items-center space-x-5">
              <button className="flex aspect-square w-8 items-center justify-center rounded-lg bg-blue-300 text-xl text-gray-500">
                -
              </button>
              <span>1</span>
              <button className="flex aspect-square w-8 items-center justify-center rounded-lg bg-blue-300 text-xl text-gray-500">
                +
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-2xl font-semibold">$450</span>
            <button className="rounded-xl bg-blue-500 px-8 py-2 text-center text-sm text-white">
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
