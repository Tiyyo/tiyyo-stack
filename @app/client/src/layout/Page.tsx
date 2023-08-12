import { Link } from "react-router-dom";
import { useContext } from "react";
import AppContext from "../context/AppContext";

function Page({ children }: { children: React.ReactNode }) {
  const { isAuth, setIsAuth } = useContext<any>(AppContext);

  const logout = async () => {
    try {
      const result = await fetch(
        import.meta.env.VITE_API_BASE_URL + "auth/logout",
        {
          method: "POST",
          credentials: "include"
        }
      );
      if (result.ok) {
        setIsAuth(false);
        console.log("logged out");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleClick = () => {
    logout();
  };

  return (
    <div className="bg-primary-100 min-h-screen">
      <nav className="flex justify-between gap-x-8 px-4 py-2">
        <button>Chat</button>
        {!isAuth ? (
          <div>
            <Link to="/login">
              <button className="text-secondary-500 border-accent-400 hover:bg-accent-400 mx-1 h-9 rounded-lg border-2 bg-opacity-80 px-3 font-semibold transition-all hover:bg-opacity-80">
                Sign In
              </button>
            </Link>
            <Link to="/signup">
              <button className="bg-accent-400 text-secondary-500 mx-1 h-9 rounded-lg bg-opacity-80 px-3 font-semibold transition-all hover:bg-opacity-100">
                Sign Up
              </button>
            </Link>
          </div>
        ) : (
          <Link to="/signup" onClick={handleClick}>
            <button className="text-secondary-500 border-accent-400 hover:bg-accent-400 mx-1 h-9 rounded-lg border-2 bg-opacity-80 px-3 font-semibold transition-all hover:bg-opacity-80">
              Logout
            </button>
          </Link>
        )}
      </nav>
      {children}
    </div>
  );
}

export default Page;
