import React, { useEffect, useState } from 'react'
import '../styles/loading.css'


const Loading  = (props) => {
  const [isLoading, setIsLoading] = useState(props.valueLoading);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 58000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className='loading-conteiner'>
      {isLoading && <div className="loading">{props.msj}</div>}
    </div>
  )
}

export default Loading 