import { useRouteError } from "react-router-dom";

export default function ErrorLayout() {
  const error = useRouteError();
  console.error(error);
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "100px",
      }}
    >
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred</p>
      <p>
        <i>{error.message || error.statusText}</i>
      </p>
    </div>
  );
}
