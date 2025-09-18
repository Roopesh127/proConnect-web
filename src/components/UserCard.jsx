import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import {removeUserFromFeed} from "../utils/feedSlice";

const UserCard = ({ user }) => {
  // console.log(user)
  if (!user) {
    return <div>Loading...</div>;
  }
  const { _id, firstName, lastName, gender, photoUrl, about, skills } = user;
  const dispatch = useDispatch();
  const handleSendRequest = async (status, _id) => {
    try {
      let res = await axios.post(
        BASE_URL + "/request/send/" + status + "/" + _id,
        {},
        { withCredentials: true }
      );
      dispatch(removeUserFromFeed(_id));
      // console.log("res", res);
    } catch (err) {
      console.log(err?.response?.data);
    }
  };

  return (
    <div className="card bg-base-300 w-96 shadow-xl">
      <figure>
        <img
          src={photoUrl}
          alt="userPhoto"
          className="h-40 w-40 object-cover rounded-full mt-2 mx-auto"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{firstName + " " + lastName}</h2>
        <p>{gender}</p>
        <p>{about}</p>
        <div>
          My Skills are :
          <ul className="list-disc list-inside">
            {skills?.map((skil, index) => (
              <li key={index}>{skil}</li>
            ))}
          </ul>
        </div>
        <div className="card-actions justify-center flex gap-5">
          <button
            onClick={() => handleSendRequest("intrested", _id)}
            className="btn btn-secondary"
          >
            Intrested
          </button>
          <button
            onClick={() => handleSendRequest("ignored", _id)}
            className="btn btn-primary"
          >
            Not Intrested
          </button>
        </div>
      </div>
    </div>
  );
};
export default UserCard;
