import { use, useState } from "react";
//import axios from "axios";
import { Link, useNavigate } from "react-router-dom"
import client from "../api/client"
import axios from "axios";

const API_BASE = "http://Localhost:8000"
export default function RegisterForm({ onSwitchToLogin }) {
    const [username, setusername] = useState("");
    const [password, setpassword] = useState("");
    const [error, seterror] = useState("");
    const [success, setsuccess] = useState("");
    const [loading, setloading] = useState(false);
    const navigate = useNavigate()


    const handleSubmit = async (e) => {
        e.preventDefault();
        seterror("");
        setsuccess("");
        setloading("");
        try {
            await axios.post(`${API_BASE}/auth/register`, { username, password });
            setsuccess("Account created! Redirecting to login ...");
            setTimeout(() => navigate("/login"), 1500);
        } catch (err) {
            seterror(err.response?.data?.detail || "Registration failed");
            console.log(err);

        } finally {
            setloading(false);
        }
    };
    return (
        <div className="sma-auth-card">
            <h2 className="sma-auth-title">Create Account</h2>
            <p className="sma-auth-subltitle">Register to get started</p>

            {error && <div className="sma-alert sma-alert-error">{error}</div>}
            {success && <div className="sma-alert sma-alert-success">{success}</div>}
            <form onSubmit={handleSubmit} className="sma-form">
                <div className="sma-form-group">
                    <label className="sma-label">Username</label>
                    <input
                        type="text"
                        value={username}
                        className="sma-input"
                        onChange={(e) => setusername(e.target.value)}
                        placeholder="choose a username"
                        required
                    />
                </div>
                <div className="sma-form-group">
                    <label className="sma-label">Password</label>
                    <input type="password"
                        className="sma-input"
                        value={password}
                        onChange={(e) => setpassword(e.target.value)}
                        placeholder="choose a password"
                        required />
                </div>
                <button type="submit"
                    className="sma-btn sam-btn-primary sma-btn-full"
                    disabled={loading || !username || !password}>
                    {loading ? "creating account..." : "create account"}
                </button>
            </form>
            <p className="sma-auth-switch">
                Already have an account{" "}
                <Link
                    type="button"
                    className="sma-auth-switch-btn" to={"/login"}>Sign in</Link>
            </p>
        </div>
    );
}