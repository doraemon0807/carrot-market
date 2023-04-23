import Layout from "@/components/layout";
import type { NextPage } from "next";
import Input from "@/components/input";
import TextArea from "@/components/textarea";
import Button from "@/components/button";

const Create: NextPage = () => {
  return (
    <Layout title="Start Streaming" canGoBack>
      <div className="px-4 ">
        <div className="">
          <Input name="input" kind="text" label="Name" />
        </div>
        <div className="my-5">
          <Input name="price" kind="price" label="Price" />
        </div>
        <div>
          <TextArea label="Description" />
        </div>
        <Button text="Start Streaming" />
      </div>
    </Layout>
  );
};

export default Create;
