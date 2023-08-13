import { Link } from "react-router-dom";
import Page from "./layout/Page";

function App() {
  return (
    <Page>
      <div className="flex flex-col items-center justify-center px-3">
        <h1 className="my-2 text-4xl">Hello world!</h1>
        <p className="text-center opacity-70">
          Some boilerplate to avoid rewrite the same thing over and over
        </p>
        <h2 className="my-4 text-lg">Features</h2>
        <div className="flex flex-wrap gap-4">
          <Link to="/chat" className="flex flex-col items-center text-center">
            <img src="/chat_3d_icon.png" className="aspect-square h-12" />
            <p className="text-sm">
              <span className="text-accent-200">Instant chat</span>
              <span className="block text-xs opacity-50">
                with history managment
              </span>
            </p>
          </Link>
          <Link
            to="/profile"
            className="flex flex-col items-center text-center"
          >
            <img src="/profile_3d_icon.png" className="aspect-square h-12" />
            <p className="text-sm">
              <span className="text-accent-200">Profile page </span>
              <span className="block text-xs opacity-50"></span>
            </p>
          </Link>
        </div>
      </div>
    </Page>
  );
}

export default App;
