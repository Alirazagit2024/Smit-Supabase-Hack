import { createContext, useState, useEffect } from 'react';
import supabase from '../lib/supabase';
import { toast } from 'react-toastify';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [userName, setUserName] = useState(null);
  const [avatar_url, setAvatarUrl] = useState(null);
  const [greeting, setGreeting] = useState('Hello');
  const [loading, setLoading] = useState(true);

  const updateGreeting = () => {
    const now = new Date();
    const hour = now.getHours();
    const isAM = now.getHours() < 12;

    if (isAM) {
      setGreeting('Good Morning');
    } else if (hour >= 12 && hour < 17) {
      setGreeting('Good Afternoon');
    } else {
      setGreeting('Good Evening');
    }
  };

  const fetchUserData = async (sessionUser) => {
    if (sessionUser) {
      setUser(sessionUser);
      setRole(sessionUser.user_metadata.role || 'user');
      setAvatarUrl(sessionUser.user_metadata.avatar_url || '/Images/user.webp');
      
      let name = sessionUser.user_metadata.full_name || sessionUser.email.split('@')[0];
      
      if (!name) {
        const { data, error } = await supabase
          .from('profiles')
          .select('full_name')
          .eq('id', sessionUser.id)
          .single();
        
        if (error) {
          console.error('Error fetching profile:', error);
          toast.error('Failed to fetch user profile');
          name = sessionUser.email.split('@')[0];
        } else {
          name = data?.full_name || sessionUser.email.split('@')[0];
        }
      }
      
      setUserName(name);
      updateGreeting();
      // console.log('Auth state:', { 
      //   id: sessionUser.id, 
      //   email: sessionUser.email, 
      //   role: sessionUser.user_metadata.role, 
      //   name, 
      //   avatar_url: sessionUser.user_metadata.avatar_url,
      //   greeting
      // });
    } else {
      setUser(null);
      setRole(null);
      setUserName(null);
      setAvatarUrl(null);
      setGreeting('Hello');
      // console.log('No user session found');
    }
    setLoading(false);
  };

  useEffect(() => {
    const initializeSession = async () => {
      const { data: { session }, error } = await supabase.auth.getSession();
      // console.log('Initial session check:', { session, error });
      if (error) {
        // console.error('Error getting initial session:', error);
        toast.error('Failed to initialize session');
      }
      await fetchUserData(session?.user);
    };

    initializeSession();

    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
      // console.log('Auth state changed:', event, session);
      await fetchUserData(session?.user);
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user, role, userName, avatar_url, greeting, loading }}>
      {loading ? <div>Loading...</div> : children}
    </AuthContext.Provider>
  );
};