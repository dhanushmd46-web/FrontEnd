// // import { useState } from "react";
// // import Demo from "./Demo";
// // import "./App.css";

// //const { useState } = require("react");

// // function App() {
// //     const [count, setCount] = useState(0);
// //     const [incValue, setIncValue] = useState("");
// //     const [decValue, setDecValue] = useState("");
// //     const [isResetClicked, setIsResetClicked] = useState(false);
// //     const [lastAction, setLastAction] = useState("");

// //     const increment = () => {
// //         setCount((prev) => prev + 1);
// //         setLastAction("inc");
// //     };

// //     const decrement = () => {
// //         setCount((prev) => prev - 1);
// //         setLastAction("dec");
// //     };

// //     const reset = () => {
// //         setCount(0);
// //         setIncValue("");
// //         setDecValue("");
// //         setLastAction("");

// //         setIsResetClicked(true);
// //         setTimeout(() => setIsResetClicked(false), 500);
// //     };

// //     const handleAdd = () => {
// //         if (lastAction === "inc") {
// //             setIncValue(count);
// //         } else if (lastAction === "dec") {
// //             setDecValue(count);
// //         }
// //     };

// //     return (
// //         <Demo
// //             count={count}
// //             increment={increment}
// //             decrement={decrement}
// //             reset={reset}
// //             isResetClicked={isResetClicked}
// //             incValue={incValue}
// //             decValue={decValue}
// //             setIncValue={setIncValue}
// //             setDecValue={setDecValue}
// //             handleAdd={handleAdd}
// //         />
// //     )
// // }

// // export default App;


// import { useState } from 'react'
// import './App.css'
// import LoginForm from './component/LoginForm'
// import RegisterForm from './component/RegisterForm'
// import StudentList from './component/StudentList'
// import Header from './component/Header'

// export default function App() {
//   // !! converts token string → true, null → false
//   const [isLoggedIn, setIsLoggedIn] = useState(
//     !!localStorage.getItem('token')
//   );
//   const [showRegister, setShowRegister] = useState(false);

//   const handleLoginSuccess = () => setIsLoggedIn(true);

//   const handleLogout = () => {
//     localStorage.removeItem('token');
//     setIsLoggedIn(false);
//   };

//   if (isLoggedIn) {
//     return (
//       <div className="sma-app">
//         <Header onLogout={handleLogout} />
//         <main className="sma-main">
//           <StudentList />
//         </main>
//       </div>
//     );
//   }

//   return (
//     <div className="sma-app sma-auth-layout">
//       {showRegister ? (
//         <RegisterForm onSwitchToLogin={() => setShowRegister(false)} />
//       ) : (
//         <LoginForm
//           onLoginSuccess={handleLoginSuccess}
//           onSwitchToRegister={() => setShowRegister(true)}
//         />
//       )}
//     </div>
//   );
// }


/* Rect api integration webpage */

import { Routes, Route, Navigate } from 'react-router-dom'
import './App.css'
import LandingPage from './component/LandingPage'
import LoginForm from './component/LoginForm'
import RegisterForm from './component/RegisterForm'
import StudentList from './component/StudentList'
import Header from './component/Header'
import ProtectedRoute from './component/ProtectedRoute'
import CreateStudentPage from './component/CreateStudentPage'
import EditStudentPage from './component/EditStudentPage'

export default function App() {
    return (
        <div className="sma-app">
            <Routes>

                {/* Public routes — no auth needed */}
                <Route path="/" element={<LandingPage />} />

                <Route path="/login" element={
                    <div className="sma-auth-layout"><LoginForm /></div>
                } />

                <Route path="/register" element={
                    <div className="sma-auth-layout"><RegisterForm /></div>
                } />

                {/* Protected route — ProtectedRoute checks for JWT token */}
                <Route path="/students" element={
                    <ProtectedRoute>
                        <>
                            <Header />
                            <main className="sma-main">
                                <StudentList />
                            </main>
                        </>
                    </ProtectedRoute>
                } />
                <Route path="/students/new" element={
                    <ProtectedRoute><CreateStudentPage /></ProtectedRoute>
                } />
                <Route path="/students/:id/edit" element={
                    <ProtectedRoute><EditStudentPage /></ProtectedRoute>
                } />

                {/* Catch-all — any unknown URL goes to landing page */}
                <Route path="*" element={<Navigate to="/" replace />} />

            </Routes>
        </div>
    );
}

