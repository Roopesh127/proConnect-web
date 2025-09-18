import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/constants";
import { addRequest } from "../utils/requestSlice";
import {removeRequest} from "../utils/requestSlice";

const Requests = () => {
  const dispatch = useDispatch();
  const requests = useSelector((store) => store.requests);
  const fetchRequest = async () => {
    try {
      let res = await axios.get(BASE_URL + "/user/requests/recieved", {
        withCredentials: true,
      });
      dispatch(addRequest(res.data.request));
    } catch (err) {
      console.log(err);
    }
  };

  const reviewRequest = async (status, _id) => {
    try {
      const res = await axios.post(
        BASE_URL + "/request/review" + "/" + status + "/" + _id,
        {},
        { withCredentials: true }
      );
      dispatch(removeRequest(_id))
      // console.log("res",res)
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchRequest();
  }, []);

  // console.log("Requests", requests);

  if (!requests) return;

  if (requests.length === 0) {
    return (
      <>
        <h1 className="flex justify-center text-2xl my-10 text-green-300">
          No Request found
        </h1>
      </>
    );
  }

  return (
    <div className="text-center my-10">
      <h1 className="text-bold text-3xl text-white">
        Requests :- {requests.length}
      </h1>
      {requests.map((request) => {
        const { _id, firstName, lastName, photoUrl, gender, skills, about } =
          request.fromUserId;
        return (
          <div
            key={_id}
            className="flex justify-between items-center m-2 p-2  rounded-lg bg-base-300 w-2/3 mx-auto mt-5"
          >
            <div>
              <img
                src={photoUrl}
                alt="connections Photo"
                className="w-32 h-32 object-cover rounded-lg border"
              />
            </div>
            <div>
              <p>{firstName + " " + lastName}</p>
              <p>{gender}</p>
              <p>{about}</p>
              <p>
                {(Array.isArray(skills) ? skills : skills.split(",")).map(
                  (skill, index) => (
                    <span key={index} className="mx-1 px-2 py-1 b rounded">
                      {skill.trim()}
                    </span>
                  )
                )}
              </p>
            </div>
            <div className="flex flex-col gap-3">
              <button onClick={()=>reviewRequest("accepted",request._id)} className="btn btn-secondary">Accept</button>
              <button onClick={()=>reviewRequest("rejected",request._id)} className="btn btn-primary">Reject</button>
            </div>
          </div>
        );
      })}
    </div>
  );
};
export default Requests;
