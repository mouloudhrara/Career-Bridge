import { useState } from "react";
import {useAuthContext} from './useAuthContext'


export const useSignup = ()=>{
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading]= useState(null);
    const {dispatch} = useAuthContext();
    const signup = async (firstName, lastName, email, password, userType, companyName, companyPassword) => {
  setIsLoading(true);
  setError(null);

  const response = await fetch('/api/users/register', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      firstName,
      lastName,
      email,
      password,
      userType,
      companyName: userType === "jobposter" ? companyName : undefined,
      companyPassword: userType === "jobposter" ? companyPassword : undefined
    })
  });

  const json = await response.json();

  if (!response.ok) {
    setIsLoading(false);
    setError(json.error);
  } else {
    localStorage.setItem('user', JSON.stringify(json));
    dispatch({ type: 'LOGIN', payload: json });
    setIsLoading(false);
  }
};
    return {signup, isLoading, error};
}