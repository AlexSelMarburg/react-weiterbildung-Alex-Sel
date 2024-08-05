import { Oval } from "react-loader-spinner";
import "../css/componenets/LoadingScreen.css";

export default function LoadingScreen() {
  return (
    <div id="loading-screen">
      <Oval
        visible={true}
        height="60"
        width="60"
        color="#000"
        strokeWidth={5}
        ariaLabel="oval-loading"
      />
      <h3>Loading</h3>
    </div>
  );
}
