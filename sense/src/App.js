import "./styles/App.css";
import { getDabase, ref, set } from "firebase/database";
import { app } from "./firebase";

const db = getDabase(app);

function App() {
  return <h1>BinSense</h1>;
}

export default App;
