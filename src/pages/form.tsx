import { useForm } from "react-hook-form";

// less code
// better validation
// better errors (set, clear, display)
// have control over inputs
// don't deal with events
// easier inputs

export default function Forms() {
  const { register, watch } = useForm();

  return (
    <form className="flex flex-col">
      <input
        {...register("username")}
        type="text"
        placeholder="Username"
        required
        minLength={5}
      />
      <input {...register("email")} type="email" placeholder="Email" required />
      <input
        {...register("password")}
        type="password"
        placeholder="Password"
        required
      />
      <input type="submit" value="Submit" />
    </form>
  );
}
