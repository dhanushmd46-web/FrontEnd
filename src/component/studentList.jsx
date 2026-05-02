// import StudentCard from "./studentCard"

// const students = [
//     { id: 1, name: "Ravi Kumar", age: 20, email: "ravi@test.com", city: "Kuppam" }
//     // { id: 2, name: "Priya Sharma", age: 22, email: "priya@test.com", city: "Chennai" },
//     // { id: 3, name: "Arjun Nair", age: 19, email: "arjun@test.com", city: "Bangalore" },
//     // { id: 4, name: "Deepa Rao", age: 21, email: "deepa@test.com", city: "Hyderabad" },
// ];

// export default function StudentList() {
//     return (
//         <section className="sma-section">
//             <div className="sma-section-header">
//                 <h2 className="sma-section-title">All Students</h2>
//                 <span className="sma-student-count">{students.length} students</span>
//             </div>
//             <div className="sma-student-grid">
//                 {students.map(s => (
//                     <StudentCard
//                         key={s.id}
//                         name={s.name}
//                         age={s.age}
//                         email={s.email}
//                         city={s.city}
//                     />
//                 ))}
//             </div>
//         </section>
//     );
// }



/* Rect api integration webpage */

import { useState, useEffect } from 'react'
import { Link } from "react-router-dom"
import client from '../api/client'
import StudentCard from './StudentCard'

export default function StudentList() {
  const [students, setStudents] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  // fetchStudents defined outside useEffect so handleDelete can call it too
  const fetchStudents = async () => {
    setLoading(true)
    setError('')
    try {
      const response = await client.get('/students')
      setStudents(response.data)
    } catch (err) {
      setError('Failed to load students. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchStudents()
  }, [])  // [] — fetch once when the component mounts

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this student? This cannot be undone.')) return

    try {
      await client.delete(`/students/${id}`)
      fetchStudents()   // re-fetch to keep the list in sync
    } catch (err) {
      alert('Delete failed. Please try again.')
    }
  }

  if (loading) {
    return <div className="sma-status">Loading students...</div>
  }

  if (error) {
    return (
      <div className="sma-status sma-status-error">
        {error}
        <button className="sma-retry-btn" onClick={fetchStudents}>Retry</button>
      </div>
    )
  }

  return (
    <section className="sma-section">
      <div className="sma-section-header">
        <h2 className="sma-section-title">All Students</h2>
        <div style={{ display: "flex", gap: "0.75rem", alignItmes: "center" }}>
          <span className="sma-student-count">{students.length} students</span>
          <Link to="/students/new" className='sam-btn sma-btn-primary'>+Add student</Link>
        </div>
      </div>

      {students.length === 0 ? (
        <div className="sma-empty-state">No students yet.{" "}
          <Link to="/student/new" className='sma-auth-switch-btn'>Add the first one.</Link>
        </div>
      ) : (
        <div className="sma-student-grid">
          {students.map((student) => (
            <StudentCard
              key={student.id}
              student={student}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </section>
  )
}

