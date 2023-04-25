import { FieldErrors, useForm } from "react-hook-form";

// less code
// better validation
// better errors (set, clear, display)
// have control over inputs
// don't deal with events
// easier inputs

interface LoginForm {
  username: string;
  email: string;
  password: string;
  errors?: string;
}

export default function Forms() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<LoginForm>({
    mode: "onChange",
  });

  const onValid = (data: LoginForm) => {
    console.log("I am valid");
    setError("username", { message: "Taken username" });
  };

  const onInvalid = (errors: FieldErrors) => {
    console.log(errors);
  };

  return (
    <form className="flex flex-col" onSubmit={handleSubmit(onValid, onInvalid)}>
      <input
        {...register("username", {
          required: "Username is required.",
          minLength: {
            message: "Username must be longer than 5 letters.",
            value: 5,
          },
        })}
        type="text"
        placeholder="Username"
      />
      {errors.username?.message}
      <input
        {...register("email", {
          required: "Email is required.",
          validate: {
            notGmail: (value) =>
              !value.includes("@gmail.com") || "No gmail please",
          },
        })}
        type="email"
        placeholder="Email"
      />
      <input
        {...register("password", {
          required: "Password is required.",
        })}
        type="password"
        placeholder="Password"
      />
      <input type="submit" value="Submit" />
      {errors.email?.message}
      {errors.errors?.message}
    </form>
  );
}
