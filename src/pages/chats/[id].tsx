import Chatbox from "@/components/chatbox";
import Layout from "@/components/layout";
import Message from "@/components/chat-message";
import type { NextPage } from "next";

const ChatDetail: NextPage = () => {
  return (
    <Layout title="Chat" canGoBack>
      <div className="mb-6 space-y-4 px-4">
        <Message message="Hi how much are you selling them for?" avatarUrl="" />
        <Message message="I want ￦20,000" reverted avatarUrl="" />
        <Message message="미쳤어" avatarUrl="" />
        <Message message="Hi how much are you selling them for?" avatarUrl="" />
        <Message message="I want ￦20,000" reverted avatarUrl="" />
        <Message message="미쳤어" avatarUrl="" />
        <Message message="Hi how much are you selling them for?" avatarUrl="" />
        <Message message="I want ￦20,000" reverted avatarUrl="" />
        <Message message="미쳤어" avatarUrl="" />
        <Message message="Hi how much are you selling them for?" avatarUrl="" />
        <Message message="I want ￦20,000" reverted avatarUrl="" />
        <Message message="미쳤어" avatarUrl="" />
        <Message message="Hi how much are you selling them for?" avatarUrl="" />
        <Message message="I want ￦20,000" reverted avatarUrl="" />
        <Message message="미쳤어" avatarUrl="" />
        <Message message="Hi how much are you selling them for?" avatarUrl="" />
        <Message message="I want ￦20,000" reverted avatarUrl="" />
        <Message message="미쳤어" avatarUrl="" />

        <Chatbox />
      </div>
    </Layout>
  );
};

export default ChatDetail;
