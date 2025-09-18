import { useState } from "react";
import UserCard from "./UserCard";
import axios from "axios";
import { useDispatch } from "react-redux";
import { BASE_URL } from "../utils/constants";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";

const EditProfile = ({ user }) => {
if (!user) {
  return (
    <div className="flex items-center justify-center h-screen w-screen bg-base-200">
      <div className="skeleton h-[500px] w-[700px] rounded-xl"></div>
    </div>
  );
}
  const [firstName, setFirstName] = useState(user.firstName || "");
  const [lastName, setLastName] = useState(user.lastName || "");
  const [gender, setGender] = useState(user.gender || "");
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl || "");
  const [about, setAbout] = useState(user.about || "");
  const [skills, setSkills] = useState(user.skills || []);
  const [error, setError] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const saveProfile = async () => {
    setError("");
    try {
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        { firstName, lastName, gender, photoUrl, about, skills },
        { withCredentials: true }
      );
      dispatch(addUser(res.data.data));
      navigate("/");
    } catch (err) {
      console.log(err.response?.data);
      setError(err.response?.data || "something Went Wrong");
    }
  };

  return (
    <div className="flex justify-center my-10">
      <div className="flex justify-center mx-10 gap-5">
        <div className="card bg-base-300 w-96 shadow-xl">
          <div className="card-body">
            <h2 className="card-title justify-center">Edit Profile</h2>
            <div className="flex flex-col">
              <label className="form-control w-full max-w-xs flex flex-col gap-1">
                <div className="label">
                  <span className="label-text-alt">First Name</span>
                </div>
                <input
                  type="text"
                  value={firstName}
                  placeholder="Enter your first Name here......"
                  className="input input-bordered w-full max-w-xs"
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </label>

              <label className="form-control w-full max-w-xs flex flex-col gap-1">
                <div className="label">
                  <span className="label-text-alt">Last Name</span>
                </div>
                <input
                  type="text"
                  value={lastName}
                  placeholder="Enter your last Name here......"
                  className="input input-bordered w-full max-w-xs"
                  onChange={(e) => setLastName(e.target.value)}
                />
              </label>

              <label className="form-control w-full max-w-xs flex flex-col gap-1">
                <div className="label">
                  <span className="label-text-alt">Photo URL</span>
                </div>
                <input
                  type="text"
                  value={photoUrl}
                  placeholder="Enter your photoUrl......"
                  className="input input-bordered w-full max-w-xs"
                  onChange={(e) => setPhotoUrl(e.target.value)}
                />
              </label>

              <label className="form-control w-full max-w-xs flex flex-col gap-1">
                <div className="label">
                  <span className="label-text-alt">Gender</span>
                </div>
                <input
                  type="text"
                  value={gender}
                  placeholder="Enter your gender......"
                  className="input input-bordered w-full max-w-xs"
                  onChange={(e) => setGender(e.target.value)}
                />
              </label>

              <label className="form-control w-full max-w-xs flex flex-col gap-1">
                <div className="label">
                  <span className="label-text-alt">Skills</span>
                </div>
                <input
                  type="text"
                  value={skills}
                  placeholder="Enter your skills here......"
                  className="input input-bordered w-full max-w-xs"
                  onChange={(e) => setSkills(e.target.value.split(","))}
                />
              </label>

              <label className="form-control">
                <div className="label">
                  <span className="label-text">About</span>
                </div>
                <textarea
                  className="textarea textarea-bordered h-24"
                  placeholder="About....."
                  value={about}
                  onChange={(e) => setAbout(e.target.value)}
                ></textarea>
              </label>
            </div>

            {error && <p className="text-center text-red-500">{error}</p>}
            <div className="card-actions justify-center mt-2">
              <button className="btn btn-primary" onClick={saveProfile}>
                Save Profile
              </button>
            </div>
          </div>
        </div>
        <div className="card bg-base-300 w-96 shadow-xl">
          <h2 className="card-title justify-center mt-7">Preview</h2>
          <UserCard
            user={{ firstName, lastName, gender, photoUrl, about, skills }}
          />
        </div>
      </div>
    </div>
  );
};
export default EditProfile;
