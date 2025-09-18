import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import { useEffect } from "react";
import UserCard from "./UserCard";

const Feed = () => {
  const dispatch = useDispatch();
  const feed = useSelector((store) => store.feed);
  
  const getFeed = async () => {
    // if (feed) return;
    try {
      const res = await axios.get(BASE_URL + "/feed", {
        withCredentials: true,
      });
      dispatch(addFeed(res.data));
      console.log("All feed data",res.data)
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getFeed();
  }, []);


if(!feed) return;

if(feed.length<=0){
  return(
    <h1>No More Users!!!!!!!</h1>
  )
}

  return (
    feed && (
      <div className="flex flex-col gap-10 m-10 items-center">
        {feed && feed.map((user)=> <UserCard key={user._id} user={user}/>)}
        {/* <UserCard user={feed[0]}/> */}
      </div>
    )
  )

};
export default Feed;
