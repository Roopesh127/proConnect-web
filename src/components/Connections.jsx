import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { addConnection } from "../utils/connectionSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const Connections = () => {
  const dispatch = useDispatch();
  const connections = useSelector((store) => store.connection);
  const fetchConnections = async () => {
    try {
      const connections = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      dispatch(addConnection(connections.data.data));
    } catch (err) {
      console.log(err.response?.data);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connections) return;

  if (connections.length === 0) {
    return (
      <>
        <h1 className="flex justify-center text-2xl my-10 text-green-300">
          No conections found
        </h1>
      </>
    );
  }

  // console.log("connections", connections);
  return (
    <div className="text-center my-10">
      <h1 className="text-bold text-3xl text-white">
        Connections :- {connections.length}
      </h1>
      {connections.map((connection) => {
        const { _id, firstName, lastName, photoUrl, gender, skills, about } =
          connection;
        return (
          <div
            key={_id}
            className="flex gap-2 m-4 p-4 rounded-lg bg-base-300 w-full max-w-md mx-auto items-center"
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
          </div>
        );
      })}
    </div>
  );
};
export default Connections;
