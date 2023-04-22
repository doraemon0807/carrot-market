import type { NextPage } from "next";

const StreamDetail: NextPage = () => {
  return (
    <div className="space-y-4 px-4 py-10">
      <div className="aspect-video w-full rounded-md bg-slate-300 shadow-sm"></div>

      <div className="mt-10">
        <h1 className="text-3xl font-bold text-gray-900">Galaxy S50</h1>
        <span className="mt-3 block text-3xl text-gray-900">$140</span>
        <p className="my-6 text-gray-700">
          Lorem ipsum dolor, sit amet co-nsectetur adipisicing elit. Corporis
          delectus, impedit nesciunt accusantium voluptatibus tempore odio
          deleniti, earum aspernatur aut rerum, totam corrupti perferendis at!
          Iusto facilis ex nostrum odit?
        </p>
      </div>

      <h2 className="text-2xl font-bold text-gray-900">Live Chat</h2>

      <div className="h-[50vh] space-y-4 overflow-y-scroll px-4 py-6 scrollbar-hide">
        <div className="flex items-start space-x-2">
          <div className="h-8 w-8 rounded-full bg-slate-300" />
          <div className="w-1/2 rounded-md border border-gray-300 p-2 text-sm text-gray-700">
            <p>Hi how much are you selling them for?</p>
          </div>
        </div>
        <div className="flex flex-row-reverse items-start space-x-2  space-x-reverse">
          <div className="h-8 w-8 rounded-full bg-slate-300" />
          <div className="w-1/2 rounded-md border border-gray-300 p-2 text-sm text-gray-700">
            <p>I want ￦20,000</p>
          </div>
        </div>
        <div className="flex items-start space-x-2">
          <div className="h-8 w-8 rounded-full bg-slate-300" />
          <div className="w-1/2 rounded-md border border-gray-300 p-2 text-sm text-gray-700">
            <p>미쳤어</p>
          </div>
        </div>
        <div className="flex items-start space-x-2">
          <div className="h-8 w-8 rounded-full bg-slate-300" />
          <div className="w-1/2 rounded-md border border-gray-300 p-2 text-sm text-gray-700">
            <p>Hi how much are you selling them for?</p>
          </div>
        </div>
        <div className="flex flex-row-reverse items-start space-x-2  space-x-reverse">
          <div className="h-8 w-8 rounded-full bg-slate-300" />
          <div className="w-1/2 rounded-md border border-gray-300 p-2 text-sm text-gray-700">
            <p>I want ￦20,000</p>
          </div>
        </div>
        <div className="flex items-start space-x-2">
          <div className="h-8 w-8 rounded-full bg-slate-300" />
          <div className="w-1/2 rounded-md border border-gray-300 p-2 text-sm text-gray-700">
            <p>미쳤어</p>
          </div>
        </div>
        <div className="flex items-start space-x-2">
          <div className="h-8 w-8 rounded-full bg-slate-300" />
          <div className="w-1/2 rounded-md border border-gray-300 p-2 text-sm text-gray-700">
            <p>Hi how much are you selling them for?</p>
          </div>
        </div>
        <div className="flex flex-row-reverse items-start space-x-2  space-x-reverse">
          <div className="h-8 w-8 rounded-full bg-slate-300" />
          <div className="w-1/2 rounded-md border border-gray-300 p-2 text-sm text-gray-700">
            <p>I want ￦20,000</p>
          </div>
        </div>
        <div className="flex items-start space-x-2">
          <div className="h-8 w-8 rounded-full bg-slate-300" />
          <div className="w-1/2 rounded-md border border-gray-300 p-2 text-sm text-gray-700">
            <p>미쳤어</p>
          </div>
        </div>
        <div className="flex items-start space-x-2">
          <div className="h-8 w-8 rounded-full bg-slate-300" />
          <div className="w-1/2 rounded-md border border-gray-300 p-2 text-sm text-gray-700">
            <p>Hi how much are you selling them for?</p>
          </div>
        </div>
        <div className="flex flex-row-reverse items-start space-x-2  space-x-reverse">
          <div className="h-8 w-8 rounded-full bg-slate-300" />
          <div className="w-1/2 rounded-md border border-gray-300 p-2 text-sm text-gray-700">
            <p>I want ￦20,000</p>
          </div>
        </div>
        <div className="flex items-start space-x-2">
          <div className="h-8 w-8 rounded-full bg-slate-300" />
          <div className="w-1/2 rounded-md border border-gray-300 p-2 text-sm text-gray-700">
            <p>미쳤어</p>
          </div>
        </div>
      </div>

      <div className="fixed inset-x-0 bottom-0 mx-auto w-full max-w-md bg-white py-2">
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
    </div>
  );
};

export default StreamDetail;
