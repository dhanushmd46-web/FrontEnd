// export default function Header() {
//   return (
//     <header className="sma-header">
//       <div className="sma-header-brand">
//         <span className="sma-header-logo">◆</span>
//         <span className="sma-header-title">Student Management System</span>
//       </div>
//       <nav className="sma-header-nav">
//         <span className="sma-header-nav-item sma-nav-active">Students</span>
//       </nav>
//     </header>
//   );
// }

import { Link, NavLink, replace, useNavigate, useNavigation } from "react-router-dom"
export default function Header({ onLogout }) {
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('token')
    navigate('/', { replace: true })
  }
  return (
    <header className="sma-header">
      <div className="sma-header-brand">
        <span className="sma-header-logo">◆</span>
        {/* <span className="sma-header-title">Student Management System</span> */}
        <Link to="/students" className="sma-haeader-title-link">
          Student Management System</Link>
      </div>
      <nav className="sma-header-nav">
        <NavLink to="/students" className={({ isActive }) => isActive ? "sma-header-nav-item sma-nav-active" : "sma-header-nav-item"}>
          Stuendts</NavLink>
        {/* <span className="sma-header-nav-item sma-nav-active">Students</span>
        {onLogout && ( */}
        <button className="sma-btn-logout" onClick={onLogout}>
          Sign Out
        </button>
        {/* )} */}
      </nav>
    </header>
  );
}