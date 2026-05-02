

import { useState } from "react";
import StudentList from "./component/studentList";
// import StudentCard from "./assets/component/studetnCard";




function Toggle() {
    const [Change,setChange] = useState(false);
    const handle = () => setChange(!Change)
    return (
        <>
            <button onClick={handle}>{Change ? "Hide" : "show students"}</button>
            {Change && <StudentList />}
        </>
    );

}
export default Toggle;