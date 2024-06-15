import React, { useEffect, useState } from "react";
import AxiosInstance from "../helpers/AxiosRequest";
import { Link, NavLink, useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [users, setUser] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchuser = async () => {
      try {
        const response = await AxiosInstance.get("/messanger/user");
        console.log("response", response);
        setUser(response?.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchuser();
  }, []);

  const handleuser = (id) =>{
    navigate(`/messenger/${id}`)
  }

  return (
    <div className="d-flex p-5">
      {users?.length > 0 ? (
         <table className="table">
         <thead>
           <tr>
             <th scope="col">Name</th>
             <th scope="col">Mobile</th>
           </tr>
         </thead>
         <tbody>
           {users.map((userItem, index) => (
             <tr key={index}>
               <td onClick = {()=>handleuser(userItem.id)} style={{cursor:'pointer'}}>{userItem.name}</td>
               <td>{userItem.mobile}</td>
             </tr>
           ))}
         </tbody>
       </table>
       
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default Dashboard;
