import React, { useEffect } from "react";
import axios from "axios";
import NavBar from "./NavBar";
import Footer from "./Footer";
import { Outlet, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";

const Body = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userData = useSelector((store) => store.user);

  const fetchUser = async () => {
    if(userData) return;
    try {
      const res = await axios.get(BASE_URL + "/profile/view", {
        withCredentials: true,
      });
      dispatch(addUser(res.data));
    } catch (err) {
      if (err.status === 401) {
        navigate("/login");
      }

      console.error(err.response.data);
    }
  };

  useEffect(() => {
    // if (!userData) {
      fetchUser();
    // }
  }, []);

  return (
    <div>
      <NavBar />
      <Outlet className="my-10"/>
      <Footer />
    </div>
  );
};

export default Body;
