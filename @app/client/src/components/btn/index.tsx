import Loading from "../../assets/Loading";
import { IButton } from "./interface";

function Button({ type, isLoading, children, value, ...rest }: IButton) {
  return (
    <button
      type={type}
      className="bg-primary-400 text-secondary-400 hover:bg-primary-500 border-secondary-300 my-4 w-full rounded-lg border border-opacity-20 px-4 py-3 shadow-sm "
    >
      {isLoading ? (
        <>
          <Loading />
          <span className="text-xs">Loading ...</span>
        </>
      ) : (
        <p>{value}</p>
      )}
    </button>
  );
}

export default Button;
