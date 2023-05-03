import { UserProp } from "@/components/auth";
import Avatar from "@/components/avatar";
import Button from "@/components/button";
import Input from "@/components/input";
import Layout from "@/components/layout";
import useMutation from "@/libs/client/useMutation";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

interface EditProfileForm {
  email?: string;
  phone?: string;
  name?: string;
  formError?: string;
}

interface EditProfileResponse {
  ok: boolean;
  error?: string;
}

export default function EditProfile({ user }: UserProp) {
  const router = useRouter();

  const {
    register,
    setValue,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<EditProfileForm>();

  //Give preset value for either email or phone
  useEffect(() => {
    if (user?.email) setValue("email", user.email);
    if (user?.phone) setValue("phone", user.phone);
    if (user?.name) setValue("name", user.name);
  }, [user, setValue]);

  //API to grab user's info
  const [editProfile, { data, loading }] =
    useMutation<EditProfileResponse>(`/api/users/me`);

  const onValid = ({ email, phone, name }: EditProfileForm) => {
    if (loading) return;
    if (email === "" && phone === "" && name === "") {
      return setError("formError", {
        message: "Please fill in the form with proper value.",
      });
    }
    editProfile({
      email,
      phone,
      name,
    });
  };

  //If useMutation returns error, update SetError
  useEffect(() => {
    if (data && !data.ok && data.error) {
      setError("formError", {
        message: data.error,
      });
    }
  }, [data, setError]);

  //return to profile page if successful
  useEffect(() => {
    if (data && data.ok) {
      router.push(`/profile`);
    }
  }, [data, router]);

  return (
    <Layout title="Edit Profile" canGoBack>
      <form
        onChange={() => clearErrors()}
        onSubmit={handleSubmit(onValid)}
        className="space-y-4 px-4 py-10"
      >
        <div className="flex items-center space-x-3">
          <Avatar id={user?.id + ""} url="" />
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

        <Input
          register={register("name")}
          name="name"
          kind="text"
          label="Name"
        />

        <Input
          register={register("email")}
          name="email"
          kind="text"
          label="Email Address"
        />

        <Input
          register={register("phone")}
          name="phone"
          kind="phone"
          label="Phone Number"
        />
        {errors.formError ? (
          <span className="my-2 block text-center font-medium text-red-500">
            {errors.formError.message}
          </span>
        ) : null}

        <Button loading={loading} text={"Update Profile"} />
      </form>
    </Layout>
  );
}
