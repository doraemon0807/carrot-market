import Chatbox from "@/components/chatbox";
import Layout from "@/components/layout";
import Message from "@/components/chat-message";
import type { NextPage } from "next";
import { useForm } from "react-hook-form";

const ChatDetail: NextPage = () => {
  const { register } = useForm();

  return (
    <Layout title="Chat" canGoBack>
      <div className="mb-6 space-y-4 px-4">
        <Message
          senderId={1}
          message="Hi how much are you selling them for?"
          avatarUrl=""
        />
        <Message senderId={1} message="I want ￦20,000" reverted avatarUrl="" />
        <Message senderId={1} message="미쳤어" avatarUrl="" />
        <Message
          senderId={1}
          message="Hi how much are you selling them for?"
          avatarUrl=""
        />
        <Message senderId={1} message="I want ￦20,000" reverted avatarUrl="" />
        <Message senderId={1} message="미쳤어" avatarUrl="" />
        <Message
          senderId={1}
          message="Hi how much are you selling them for?"
          avatarUrl=""
        />
        <Message senderId={1} message="I want ￦20,000" reverted avatarUrl="" />
        <Message senderId={1} message="미쳤어" avatarUrl="" />
        <Message
          senderId={1}
          message="Hi how much are you selling them for?"
          avatarUrl=""
        />
        <Message senderId={1} message="I want ￦20,000" reverted avatarUrl="" />
        <Message senderId={1} message="미쳤어" avatarUrl="" />
        <Message
          senderId={1}
          message="Hi how much are you selling them for?"
          avatarUrl=""
        />
        <Message senderId={1} message="I want ￦20,000" reverted avatarUrl="" />
        <Message senderId={1} message="미쳤어" avatarUrl="" />
        <Message
          senderId={1}
          message="Hi how much are you selling them for?"
          avatarUrl=""
        />
        <Message senderId={1} message="I want ￦20,000" reverted avatarUrl="" />
        <Message senderId={1} message="미쳤어" avatarUrl="" />

        <Chatbox
          register={register("text", {
            required: true,
          })}
        />
      </div>
    </Layout>
  );
};

export default ChatDetail;
