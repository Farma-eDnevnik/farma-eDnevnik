import { Input } from "@/components/ui/input";
import { useForm, SubmitHandler } from "react-hook-form"
import ReactLogo from "@/assets/react.svg?react";

type Inputs = {
  email: string
  password: string
}

export const Login = () => {
  const {
    register,
    handleSubmit,
  } = useForm<Inputs>()
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data)
  return (
    <div className="flex min-h-screen">
      <div className="w-1/2 h-screen justify-center bg-gray-100">
        <ReactLogo className="w-full h-full object-center " />
      </div>

      <div className="w-1/2 h-screen flex items-center justify-center bg-white">
        <div className="max-w-md w-full px-8">
          <h1 className="text-3xl font-semibold mb-2">Login</h1>
          <p className="text-gray-600 mb-6">
            Enter your email and password below to log into your account.
          </p>

          <form onSubmit={handleSubmit(onSubmit)}>
            <label htmlFor="email" className="block text-sm font-medium mb-1">
              Email
            </label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              className="mb-4"
              {...register("email")}
            />

            <label htmlFor="password" className="block text-sm font-medium mb-1">
              Password
            </label>
            <Input
              id="password"
              type="password"
              placeholder="Password"
              className="mb-2"
              {...register("password")}
            />

            <div className="text-right text-sm mb-4">
              <a href="#" className="text-blue-600 hover:underline">
                Forgotten password?
              </a>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded text-center transition-colors"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
