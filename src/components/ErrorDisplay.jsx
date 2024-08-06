import "../css/componenets/ErrorDisplay.css";

export default function ErrorDisplay({
  mainMsg = "Something went wrong!",
  errorMsg,
}) {
  return (
    <div className="error-display">
      <h3>{mainMsg}</h3>
      <p className="error-msg">{errorMsg}</p>
    </div>
  );
}
