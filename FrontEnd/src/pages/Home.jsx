import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export function Home({ token }) {
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate('/');
    }
  }, [token, navigate]);

  if(token){
    return (
        <div>Homeeeee</div>
      );
  }
}
