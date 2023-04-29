import React, { useEffect, useState } from 'react'
import Loading from './Loading '
import { useNavigate } from 'react-router-dom';

const WaitingLogin = () => {
    const messaje = "Waiting for your email confirmation";
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            navigate("/login")
        }, 59000);
        return () => clearTimeout(timer);
      }, []);
  return (
    <div>
       <Loading msj={messaje} valueLoading={loading} /> 
    </div>
  )
}

export default WaitingLogin