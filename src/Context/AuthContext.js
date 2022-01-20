import React, { createContext, useState } from 'react';
import { Children } from 'react/cjs/react.production.min';
import { supabase } from '../supabaseClient';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);

  // Authentication function for logging in new/old user with supabase magic link
  const logInAccount = async (email) => {
    setLoading(true);
    try {
      // supabase method to send the magic link to the email provided
      const { error } = await supabase.auth.signIn({ email });

      if (error) throw error; //check if there was an error fetching the data and move the execution to the catch block
      console.log('account created');
      alert('Check your email for your magic login link!');
    } catch (error) {
      alert(error.error_description || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        loading,
        logInAccount,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
