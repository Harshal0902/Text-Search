import React, { useEffect, useState } from "react";
import SinglePost from "./Post/SinglePost";
import { GetAllPosts } from "../../services/posts";
import { motion } from "framer-motion"
import {fadeItem} from "../../animations/animation";

export default function Posts({ searchPostData }) {
  const [postData, setPostData] = useState([]);

  const GetAllPostsByRequest = () =>
    GetAllPosts()
      .then(({ data: { data } }) => {
        console.log("data", data);
        setPostData(data);
      })
      .catch((e) => console.log("error", e.message));

  useEffect(() => {
    searchPostData.length === 0
      ? GetAllPostsByRequest()
      : setPostData(searchPostData);
  }, [searchPostData, searchPostData.length]);

  return (
    <div>
      <motion.div variants={fadeItem} initial="hidden" animate="visible" className="grid grid-cols-1 md:grid-cols-3 gap-4 py-28 px-12">
        {postData.length ? (
          postData.map((item, i) => (
            <div variants={fadeItem} key={i}>
              <SinglePost item={item} />
            </div>
          ))
        ) : (
          <div className="col-span-1">
            <div className="p-5 mt-5 flex justify-center items-center">
              Loading...
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}
