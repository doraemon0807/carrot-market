import Button from "@/components/button";
import Layout from "@/components/layout";
import TextArea from "@/components/textarea";
import type { NextPage } from "next";

const Write: NextPage = () => {
  return (
    <Layout title="Post Your Question" canGoBack>
      <div className="space-y-4 px-4 py-10">
        <TextArea required placeholder="Ask a question!" />
        <Button text="Post" />
      </div>
    </Layout>
  );
};

export default Write;
