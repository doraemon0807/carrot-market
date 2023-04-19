export default function Home() {
  return (
    <div className="grid min-h-screen gap-5 bg-slate-400 px-20 py-20">
      <div className="rounded-3xl bg-white p-10 shadow-xl">
        <span className="text-3xl font-semibold">Select Item</span>
        <div className="flex justify-between">
          <span className="my-2 text-gray-500">Gray Chair</span>
          <span className="font-semibold">$19</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">Gray Chair</span>
          <span className="font-semibold">$19</span>
        </div>
        <div className="mt-2 flex justify-between border-t-2 border-dashed pt-2">
          <span>Total</span>
          <span className="font-semibold">$100</span>
        </div>
        <button className="mx-auto mt-5 block w-1/2 rounded-xl bg-blue-500 p-3 text-center font-medium text-white hover:bg-teal-500 hover:text-black focus:bg-red-500 active:bg-yellow-500">
          Checkout
        </button>
      </div>
      <div className="overflow-hidden rounded-3xl bg-white shadow-xl">
        <div className="bg-blue-500 p-6 pb-14">
          <span className="text-2xl text-white">Profile</span>
        </div>
        <div className="relative -top-5 rounded-3xl bg-white p-6">
          <div className="relative -top-16 flex items-end justify-between">
            <div className="flex flex-col items-center">
              <span className="text-sm text-gray-500">Orders</span>
              <span className="font-semibold">340</span>
            </div>
            <div className="h-24 w-24 rounded-full bg-red-400" />
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
      <div className="rounded-3xl bg-white p-10 shadow-xl">
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
            <div className="space-x-2">
              <button className="h-5 w-5 rounded-full bg-yellow-500"></button>
              <button className="h-5 w-5 rounded-full bg-indigo-500"></button>
              <button className="h-5 w-5 rounded-full bg-teal-500"></button>
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
