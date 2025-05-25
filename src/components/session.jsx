import React from 'react'

function session() {
    useEffect(() => {
        const session = supabase.auth.session();
        if (session) {
          localStorage.setItem("login_user", session.access_token);
          navigate("/pricing");
        }
      }, []);
      
  return (
    <div></div>
  )
}

export default session