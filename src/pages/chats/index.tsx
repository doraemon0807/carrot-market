import Chatroom from "@/components/chatroom";
import Layout from "@/components/layout";
import type { NextPage } from "next";

const Chat: NextPage = () => {
  return (
    <Layout title="Chats" hasTabBar>
      <div className="divide-y-[1px]">
        {[1, 2, 3, 4, 5, 6].map((_, i) => (
          <div key={i}>
            <Chatroom
              id={i}
              name="Steve Jebs"
              message="See you tomorrow at 2pm!"
            />
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default Chat;
