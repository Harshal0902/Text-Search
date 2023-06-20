import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion"
import { fadeItem } from "../../../animations/animation";

export default function SinglePost({ item }) {
  return (
    <motion.div variants={fadeItem} className="transition-all duration-300">
      <div className="p-4  bg-slate-500 rounded-lg">
        <div className="mb-4 grid place-items-center">
          <img
            src={item.imageFileSet}
            alt={item.title}
            className="h-56"
          />
        </div>
        <div>
          <Link to={`/posts/${item._id}`} className="text-xl text-white">
            <h1 variant="body1" className="text-xl text-white">
              {item.title}
            </h1>
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
