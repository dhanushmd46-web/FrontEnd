import { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import client from '../api/client'
import Header from './Header'

export default function EditStudentPage() {
    const { id } = useParams()
    const navigate = useNavigate()

    const [form, setForm] = useState({ name: '', age: '', email: '', city: '' })
    const [fetching, setFetching] = useState(true)
    const [saving, setSaving] = useState(false)
    const [error, setError] = useState('')


    useEffect(() => {
        const fetchStudent = async () => {
            try {
                const response = await client.get(`/students/${id}`)
                const s = response.data
                setForm({
                    name: s.name,
                    age: String(s.age),
                    email: s.email,
                    city: s.city,
                })
            } catch (err) {
                setError('Student not found.')
            } finally {
                setFetching(false)
            }
        }
        fetchStudent()
    }, [id])

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        setSaving(true)

        try {
            await client.put(`/students/${id}`, {
                ...form,
                age: Number(form.age),
            })
            navigate('/students')

        } catch (err) {
            setError(err.response?.data?.detail || 'Failed to update student')
        } finally {
            setSaving(false)
        }
    }

    if (fetching) {
        return (
            <>
                <Header />
                <main className="sma-main">
                    <div className="sma-status">Loading student...</div>
                </main>
            </>
        )
    }
    return (
        <>
            <Header />
            <main className='sam-main'>
                <div className='sma-form-page'>
                    <div className="sma-form-page-header">
                        <Link to="student" className="sma-back-link">Back to student</Link>
                        <h2 className='sma-form-page-title'>Edit student</h2>

                    </div>
                    {error && <div className='sma-alert sma-alert-error'>{error}</div>}
                    <form onsubmit={handleSubmit} className='sma-form sma-form-wide'>
                        <div className='sma-form-group'>
                            <label className='sma-label'>Full name</label>
                            <input
                                name="name"
                                type="text"
                                className='sma-input'
                                value={form.name}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className='sma-form-group'>
                            <label className='sam-label'>Age</label>
                            <input
                                name="" name
                                type="text"
                                className='sma-input'
                                value={form.age}
                                onChange={handleChange}
                                min="1"
                                max="100"
                                required
                            />
                        </div>
                        <div className='sma-form-group'>
                            <label className='sma-label'>Email</label>
                            <input
                                name="name"
                                type="text"
                                className='sma-input'
                                value={form.email}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className='sam-form-group'>
                            <label className='sma-label'>City</label>
                            <input
                                name="name"
                                type="text"
                                className='sam-input'
                                value={form.city}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className='sam-form-action'>
                            <Link to="/students" className='sam-btn sam-btn-ghost'>Cancle</Link>
                            <button
                                type="submit"
                                className='sma-btn sma-btn-primary'
                                disabled={saving}
                            >{saving ? "saving..." : "save changes"}</button>
                        </div>
                    </form>
                </div>
            </main>
        </>
    )
}

