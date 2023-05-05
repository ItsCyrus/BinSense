import "./styles/App.css";
import { getDatabase, ref, set } from "firebase/database";
import { app } from "./firebase";

const db = getDatabase(app);

function App() {
  return <h1>BinSense</h1>;
}

export default App;
