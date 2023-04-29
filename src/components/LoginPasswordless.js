import React, { useEffect } from 'react'
import Loading from './Loading '
import { useNavigate } from 'react-router-dom';

const LoginPasswordless = () => {
    const email = JSON.parse(sessionStorage.getItem("emailUser"));
    const navigate = useNavigate();
    const messaje = "Just a moments";


    useEffect(() => {
        const timer = setTimeout(() => {

        }, 3000);
    
        return () => clearTimeout(timer);
      }, []);






  return (
    <Loading msj={messaje} />
  )
}

export default LoginPasswordless