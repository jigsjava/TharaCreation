import React from 'react'
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Button } from "react-bootstrap";


const LogOut = () => {
    const navigate = useNavigate();

    const handleLogOut = () => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("user");
        toast.success("Successfully Logged Out", {
            position: toast.POSITION.TOP_CENTER,
          });
          navigate("/login");
    }
    
  return (
    <Button onClick={handleLogOut} className="btn btn-secondary">
        LogOut
    </Button>
  )
}

export default LogOut