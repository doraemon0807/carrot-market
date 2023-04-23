import Chatbox from "@/components/chatbox";
import Layout from "@/components/layout";
import Message from "@/components/message";
import type { NextPage } from "next";

const StreamDetail: NextPage = () => {
  return (
    <Layout title="Stream" canGoBack>
      <div className="space-y-4 px-4">
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
          <Message
            message="Hi how much are you selling them for?"
            avatarUrl=""
          />
          <Message message="I want ￦20,000" reverted avatarUrl="" />
          <Message message="미쳤어" avatarUrl="" />
          <Message
            message="Hi how much are you selling them for?"
            avatarUrl=""
          />
          <Message message="I want ￦20,000" reverted avatarUrl="" />
          <Message message="미쳤어" avatarUrl="" />
          <Message
            message="Hi how much are you selling them for?"
            avatarUrl=""
          />
          <Message message="I want ￦20,000" reverted avatarUrl="" />
          <Message message="미쳤어" avatarUrl="" />
          <Message
            message="Hi how much are you selling them for?"
            avatarUrl=""
          />
          <Message message="I want ￦20,000" reverted avatarUrl="" />
          <Message message="미쳤어" avatarUrl="" />
          <Message
            message="Hi how much are you selling them for?"
            avatarUrl=""
          />
          <Message message="I want ￦20,000" reverted avatarUrl="" />
          <Message message="미쳤어" avatarUrl="" />
          <Message
            message="Hi how much are you selling them for?"
            avatarUrl=""
          />
          <Message message="I want ￦20,000" reverted avatarUrl="" />
          <Message message="미쳤어" avatarUrl="" />
        </div>

        <Chatbox />
      </div>
    </Layout>
  );
};

export default StreamDetail;
