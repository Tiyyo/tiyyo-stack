import SocialBtn from "../../components/social_btn";
import Github from "../../assets/Github";
import Google from "../../assets/Google";
import FormField from "../../components/form_field";
import SeparatorLine from "../../components/separator_line";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import schemas from "@tiyyo-stack/schema";
import { Link, useNavigate } from "react-router-dom";
import { RegisterForm } from "@/src/@types";

const { userSchema } = schemas;

function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<RegisterForm>({
    resolver: zodResolver(userSchema)
  });

  const navigate = useNavigate();

  const onSubmit = (data: RegisterForm) => {
    fetch(import.meta.env.VITE_API_BASE_URL + "auth/register", {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" }
    })
      .then((res) => {
        if (res.status === 201) {
          navigate("/login");
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="bg-primary-100 flex min-h-screen flex-col items-center justify-center">
      <div className="w-5/6 max-w-sm">
        <h2 className="text-center text-xl">Sign up for an Account</h2>
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
              error={errors.email?.message}
            />
            <FormField
              type="password"
              label="Password"
              name="password"
              register={register}
              error={errors?.password?.message}
            />
            <button
              type="submit"
              className="bg-primary-400 text-secondary-400 hover:bg-primary-500 border-secondary-300 my-4 w-full rounded-lg border border-opacity-20 px-4 py-3 shadow-sm"
            >
              Create My Account
            </button>
            <div className="self-end">
              <Link
                to="/login"
                className="text-accent-500 cursor-pointer pr-3 text-xs  font-semibold"
              >
                {" "}
                Have an Account ?
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
