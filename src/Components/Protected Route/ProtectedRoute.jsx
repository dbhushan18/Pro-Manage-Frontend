import React, { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom';

export default function ProtectedRoute(props) {
    const {Component} = props;
    const [isActive, setIsactive] = useState(true);

    useEffect(()=>{
        const token = localStorage.getItem("token")
        setIsactive(token)
    },[])

  return (
    <div>{isActive  ? < Component /> : <Navigate to="/register"/>}</div>
  )
}

