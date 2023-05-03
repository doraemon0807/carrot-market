import Avatar from "@/components/avatar";
import Button from "@/components/button";
import Input from "@/components/input";
import Layout from "@/components/layout";
import useUser from "@/libs/client/useUser";
import type { NextPage } from "next";

const EditProfile: NextPage = () => {
  return (
    <Layout title="Edit Profile" canGoBack>
      <div className="space-y-4 px-4 py-10">
        <div className="flex items-center space-x-3">
          <Avatar url="" />
          <label
            htmlFor="picture"
            className="cursor-pointer rounded-md border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 shadow-sm focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
          >
            Change
            <input
              accept="image/*"
              id="picture"
              type="file"
              className="hidden"
            />
          </label>
        </div>

        <Input name="email" kind="text" label="Email Address" />

        <Input name="phone" kind="phone" label="Phone Number" />

        <Button text="Update Profile" />
      </div>
    </Layout>
  );
};

export default EditProfile;
