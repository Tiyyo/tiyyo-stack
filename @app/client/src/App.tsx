import useFetch from "./hooks/useFetch";

function App() {
  const { data, isError, loading, error } = useFetch(
    "http://localhost:8080/api/us"
  );

  return (
    <>
      <h1 className="text-primary">Vite + React</h1>
    </>
  );
}

export default App;
