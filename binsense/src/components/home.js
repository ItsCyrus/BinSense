import { getDatabase, ref, set } from "firebase/database";
import { app } from "./firebase";

const db = getDatabase(app);

const home = () => {
    return(
        <h1>This is the home page</h1>
    );
}

export default home;
