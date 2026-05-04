import { useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import client from "../api/client";
import Header from "./Header"

export default function CreateStudentPage() {
    const navigate = useNavigate()
    const [form, setForm] = useState({ name: "", age: "", email: "", city: "" })
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        setError("")
        setLoading(true)

        try {
            await client.post("/students", {
                ...form,
                age: Number(form.age),
            })
            navigate("/students")
        } catch (err) {
            setError(err.response?.data?.detail || "Failed to create student")

        } finally {
            setLoading(false)
        }
    }
    return (
        <>
            <Header />
            <main className="sam-main">
                <div className="sma-form-page">
                    <div className="sma-form-page-header">
                        <Link to="/students" className="sma-back-link"> Back to studnets</Link>
                        <h2 className="sma-form-page-title">Add new student</h2>
                    </div>
                    {error && <div className="sma-alert sma-alert-error">{error}</div>}
                    <form onSubmit={handleSubmit} className="sma-form sma-form-wide">
                        <div className="sma-label">
                            <label className="sma-label">Full Name</label>
                            <input
                                name="name"
                                type="text"
                                className="sma-input"
                                value={form.name}
                                onChange={handleChange}
                                placeholder="e.g Ravi kumar"
                                required
                            />
                        </div>
                        <div className="sma-form-group">
                            <label className="sam-label">Age</label>
                            <input
                                name="age"
                                type="number"
                                className="sma-input"
                                value={form.age}
                                onChange={handleChange}
                                placeholder="e.g 20"
                                min="1"
                                max="100"
                                required
                            />
                        </div>
                        <div className="sma-form-group">
                            <label className="sma-label">City</label>
                            <input
                                name="city"
                                type="text"
                                className="sma-input"
                                value={form.city}
                                onChange={handleChange}
                                placeholder="e.g kuppam"
                                required
                            />
                        </div>
                        <div className="sam-form-action">
                            <Link to="/student" className="sam-btn sma-btn-ghost">Cancel</Link>
                            <button
                                type="submit"
                                className="sma-btn sma-btn-primary"
                                disabled={loading}
                            >{loading ? "Adding..." : "Add student"}</button>
                        </div>
                    </form>
                </div>
            </main>
        </>
    )
}

useState