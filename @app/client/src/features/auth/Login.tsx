import { RegisterForm } from "@/src/@types";
import Github from "../../assets/Github";
import Google from "../../assets/Google";
import FormField from "../../components/form_field";
import SeparatorLine from "../../components/separator_line";
import SocialBtn from "../../components/social_btn";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Button from "../../components/btn";
import getToken from "@/src/utils/get.cookies";

function Login() {
  const { register, handleSubmit } = useForm<RegisterForm>({});

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: RegisterForm) => {
    setLoading(true);
    try {
      await fetch(import.meta.env.VITE_API_BASE_URL + "auth/login", {
        method: "POST",
        body: JSON.stringify(data),
        mode: "cors",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "http://localhost:5173/"
        }
      });

      // const token = document.cookie.replace(
      //   /(?:(?:^|.*;\s*)accessToken\s*=\s*([^;]*).*$)|^.*$/,
      //   "$1"
      // );
      const token = getToken();

      if (!token) return { message: "no token found" };

      // request user data with token
      // redirect to home page

      const res = await fetch(
        import.meta.env.VITE_API_BASE_URL + "auth/current",
        {
          method: "GET",
          headers: {
            authorization: `Bearer ${token}`
          }
        }
      );
      const user = await res.json();
      // send user.id to a global context or to an home page via navigate and use it to fetch user data / profile / posts ect ...

      return user.userId ? navigate("/") : { message: "Unauthorized" };
    } catch (error) {
      console.log(error);
    } finally {
      // clear form
      setLoading(false);
    }
  };

  return (
    <div className="bg-primary-100 flex min-h-screen flex-col items-center justify-center">
      <div className="w-5/6 max-w-sm">
        <h2 className="text-center text-xl">Sign in</h2>
        {/* scoial auth*/}
        <div className="my-4 flex flex-col gap-y-2">
          <SocialBtn value="Sign Up with Google">
            <Google />
          </SocialBtn>
          <SocialBtn value="Sign In with Github">
            <Github />
          </SocialBtn>
          <SeparatorLine />
          {/* Traditional Auth*/}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-y-4"
          >
            <FormField
              type="text"
              label="Email"
              name="email"
              register={register}
            />
            <FormField
              type="password"
              label="Password"
              name="password"
              register={register}
            />
            <Button value="Sign In" type="submit" isLoading={loading} />
            <div className="self-end">
              <Link
                to="/login"
                className="text-accent-500 cursor-pointer pr-3 text-xs  font-semibold"
              >
                {" "}
                Don't have an Account ?
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
