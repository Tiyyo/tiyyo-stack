import { useEffect, useRef, useState, useContext, useCallback } from "react";
import ReturnBtn from "../../components/return_btn";
import AppContext from "../../context/AppContext";
import { Form } from "react-router-dom";
import { useQuery, useQueryClient } from "react-query";
// import { useDebounce } from "../../hooks/useDebounce";
// import { useMutation } from "react-query";

export type UserProfile = {
  id?: string;
  user_id?: string;
  username?: string;
  firstname?: string;
  lastname?: string;
  avatar?: string;
  bio?: string;
  date_of_birth?: Date;
  created_at?: Date;
  updated_at?: Date;
};

function FormInput({
  handleChange,
  handleFocus,
  name,
  label,
  type,
  placeholder,
  defaultValue
}: {
  handleChange?: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  handleFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
  name: string;
  type: string;
  label?: string;
  placeholder?: string;
  defaultValue?: string | null;
}) {
  return (
    <>
      <label htmlFor="firstname" className="text-sm opacity-75">
        {label}
      </label>
      <input
        id={name}
        type={type}
        placeholder={placeholder}
        defaultValue={defaultValue === null ? "" : defaultValue}
        className="focus:ri focus:ri h-8 w-full rounded-md pl-3 placeholder:pl-2 placeholder:text-xs placeholder:italic focus:ring"
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleFocus}
      />
    </>
  );
}

function Profile() {
  const { user } = useContext(AppContext);
  const queryClient = useQueryClient();

  const { data: profile, isLoading } = useQuery<UserProfile>(
    `profile/${user?.userId}`,
    {
      enabled: true
    }
  );

  const [profileFormValues, setProfileFormValues] = useState<UserProfile>({
    user_id: user?.userId,
    firstname: profile?.firstname,
    lastname: profile?.lastname,
    bio: profile?.bio,
    date_of_birth: profile?.date_of_birth,
    username: profile?.username
  });
  const [isFocused, setIsFocused] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const handleChange = async (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const copy = { ...profileFormValues, [e.target.id]: e.target.value };
    setProfileFormValues(copy);
  };

  const handleFocus = (
    e:
      | React.FocusEvent<HTMLInputElement>
      | React.FocusEvent<HTMLTextAreaElement>
  ) => {
    e.type === "focus" ? setIsFocused(true) : setIsFocused(false);
  };

  const checkIfAtLeastOneFieldHasBeenChanged = useCallback(
    (updatedObject: UserProfile, originalObject?: UserProfile) => {
      if (!originalObject) return false;

      const updatedKeys = Object.keys(updatedObject);
      const updatedValues = Object.values(updatedObject);

      const isDifferent = updatedValues.some(
        (value, index) =>
          value !== originalObject?.[updatedKeys[index] as keyof UserProfile]
      );

      return isDifferent;
    },
    []
  );

  const mutateForm = async (formData: UserProfile, signal: AbortSignal) => {
    // issue we need to validate the form before sending it
    formData.user_id = user?.userId;

    try {
      const response = await fetch(
        import.meta.env.VITE_API_BASE_URL + "api/profile",
        {
          method: "PATCH",
          body: JSON.stringify(formData),
          credentials: "include",
          headers: {
            "Content-Type": "application/json"
          },
          signal: signal
        }
      );

      // think to invalidate query manually on mutation
      // queryClient.invalidateQueries("profile");
      if (response.ok) {
        queryClient.invalidateQueries({
          queryKey: ["profile", `profile/${user?.userId}`]
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleChangeEmail = async (e) => {
    const controller = new AbortController();
    const signal = controller.signal;

    // if (isFocused) controller.abort();
    console.log(user?.userId);
    console.log(e.target.value);
    try {
      const response = await fetch(
        import.meta.env.VITE_API_BASE_URL + `api/user/${user?.userId}`,
        {
          method: "PATCH",
          body: JSON.stringify({ email: e.target.value }),
          signal: signal
        }
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    // Maybe cancel the request when an input is on focus could be a good idea
    if (isFocused) controller.abort();

    const isDifferent = checkIfAtLeastOneFieldHasBeenChanged(
      profileFormValues,
      profile
    );
    if (!isDifferent) return;

    const timer = setTimeout(() => mutateForm(profileFormValues, signal), 1000);

    return () => {
      controller.abort();
      clearTimeout(timer);
    };
  }, [profileFormValues, isFocused]);

  return (
    <div className="bg-primary-200 min-h-screen">
      <div className="text-accent-300 sticky h-8 px-6 py-3">
        <ReturnBtn />
      </div>
      <section className="p-6 dark:bg-gray-800 dark:text-gray-50">
        <form
          action=""
          className="container mx-auto flex flex-col space-y-12"
          ref={formRef}
        >
          <fieldset className="bg-primary-500 grid grid-cols-4 gap-6 rounded-md p-6 shadow-sm">
            <div className="col-span-full space-y-2 lg:col-span-1">
              <p className="font-medium">Personal Inormation</p>
              <p className="text-xs">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                Adipisci fuga autem eum!
              </p>
            </div>
            <div className="col-span-full grid grid-cols-6 gap-4 lg:col-span-3">
              <div className="col-span-full sm:col-span-3">
                <FormInput
                  handleChange={handleChange}
                  type="text"
                  name="firstname"
                  label="firstname"
                  placeholder="firstname"
                  handleFocus={handleFocus}
                  defaultValue={profile?.firstname}
                />
              </div>
              <div className="col-span-full sm:col-span-3">
                <FormInput
                  type="text"
                  name="lastname"
                  label="lastname"
                  placeholder="lastname"
                  defaultValue={profile?.lastname}
                  handleChange={handleChange}
                  handleFocus={handleFocus}
                />
              </div>
              <div className="col-span-full sm:col-span-3">
                <FormInput
                  name="email"
                  placeholder="email"
                  label="email"
                  type="email"
                  handleChange={handleChangeEmail}
                  handleFocus={handleFocus}
                />
              </div>
              <div className="col-span-full sm:col-span-3">
                <FormInput
                  name="date_of_birth"
                  placeholder="date of birth"
                  label="date of birth"
                  type="date"
                  defaultValue={profile?.date_of_birth?.toString()}
                  handleChange={handleChange}
                  handleFocus={handleFocus}
                />
              </div>
            </div>
          </fieldset>
          <fieldset className="bg-primary-500 grid grid-cols-4 gap-6 rounded-md p-6 shadow-sm">
            <div className="col-span-full space-y-2 lg:col-span-1">
              <p className="font-medium">Profile</p>
              <p className="text-xs">Update your porfile informations</p>
            </div>
            <div className="flex items-center space-x-2">
              <img
                src="https://source.unsplash.com/30x30/?random"
                alt=""
                className="h-10 w-10 rounded-full dark:bg-gray-700"
              />
              <button
                type="button"
                className="rounded-md border px-4 py-2 dark:border-gray-100"
              >
                Change
              </button>
            </div>
            <div className="col-span-full grid grid-cols-6 gap-4 lg:col-span-3">
              <div className="col-span-full sm:col-span-3">
                <FormInput
                  type="text"
                  placeholder="username"
                  name="username"
                  handleChange={handleChange}
                  handleFocus={handleFocus}
                  label="username"
                  defaultValue={profile?.username}
                />
              </div>
              <div className="col-span-full">
                <label htmlFor="bio" className="text-sm">
                  Bio
                </label>
                <textarea
                  id="bio"
                  placeholder=""
                  defaultValue={profile?.bio}
                  onChange={handleChange}
                  onFocus={handleFocus}
                  onBlur={handleFocus}
                  className="focus:ri focus:ri w-full rounded-md focus:ring dark:border-gray-700 dark:text-gray-900"
                ></textarea>
              </div>
            </div>
          </fieldset>
        </form>
      </section>
    </div>
  );
}

export default Profile;
