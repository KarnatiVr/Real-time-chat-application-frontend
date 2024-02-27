import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { userLoggedOut } from '../features/login/userSlice';
import { clearData } from '../features/contacts/contactsSlice';
import { useNavigate } from "react-router-dom";

const ProfileCard = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
  const user = useSelector((state) => state.user.loggedInUser);
    async function logoutClicked(){
        console.log("clicked")
        await axios.get("http://localhost:4000/logout", {withCredentials: true}).then((res) => {
            if(res){
                dispatch(userLoggedOut());
                dispatch(clearData());
                window.location.reload();
                navigate("/")
            }
        });
    }
  return (
    <div className="profile--card flex flex-col px-5 py-5">
      <img
        src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
        width={50}
        height={50}
        alt="profile"
      ></img>
      <p style={{ fontSize: "20px" }}>{user.name}</p>
      <p>you are logged in</p>
      <button className='logout--button' onClick={logoutClicked}>
        Logout
      </button>
    </div>
  );
}

export default ProfileCard