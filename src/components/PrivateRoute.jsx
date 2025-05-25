import { useState, useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import supabase from '../lib/supabase'
// import { supabase } from '../lib/supabase'

const PrivateRoute = ({ children, requiredRole }) => {
  const [user, setUser] = useState(null)
  const [role, setRole] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function checkUser() {
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        setUser(user)
        setRole(user.user_metadata.role)
      }
      setLoading(false)
    }
    checkUser()
  }, [])

  if (loading) return <div className="text-center mt-8">Loading...</div>
  if (!user) return <Navigate to="/login" />
  if (requiredRole && role !== requiredRole) {
    return <Navigate to="/unauthorized" />
  }
  return children
}

export default PrivateRoute