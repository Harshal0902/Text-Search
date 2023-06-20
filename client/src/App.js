import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from "./components/Navbar";
import AddPost from "./pages/Posts/Post/AddPost";
import EditPost from "./pages/Posts/Post/EditPost";
import SinglePostDetails from "./pages/Posts/Post/SinglePostDetails";
import Posts from "./pages/Posts/Posts";
import { SearchPostData } from "./services/posts";

import TextSearch from "./pages/TestSearch";

export default function App() {

  const [searchPostData, setSearchPostData] = useState([]);

  const handleSearchOnChange = (target) => {
    SearchPostData({ data: target.value }).then(({ data: { posts } }) => {
      setSearchPostData(posts);
      console.log("data", posts);
    });
    console.log("value", target.value);
  };

  return (
    <BrowserRouter>
      <Navbar searchPostData={searchPostData}
        handleSearchOnChange={handleSearchOnChange}
      />
      <Routes>
        <Route exact path='/' element={<Posts searchPostData={searchPostData} />} />
        <Route exact path='/posts' element={<Navigate to='/' />} />
        <Route path='/posts/add' element={<AddPost />} />
        <Route path='/posts/edit/:id' element={<EditPost />} />
        <Route path='/posts/:id' element={<SinglePostDetails />} />
        <Route path='/text' element={<TextSearch />} />
      </Routes>
    </BrowserRouter>
  );
}