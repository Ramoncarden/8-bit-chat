import React, { createContext, useState, useEffect } from 'react';
import { Children } from 'react/cjs/react.production.min';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const location = useNavigate();
  const close = () => location('/');

  // Authentication function for logging in new/old user with supabase magic link
  const logInAccount = async (email) => {
    setLoading(true);
    try {
      // supabase method to send the magic link to the email provided
      const { error } = await supabase.auth.signIn({ email });

      if (error) throw error; //check if there was an error fetching the data and move the execution to the catch block
      console.log('account created');
    } catch (error) {
      alert(error.error_description || error.message);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        loading,
        logInAccount,
        logout,
        close,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
