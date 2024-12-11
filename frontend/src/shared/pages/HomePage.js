import React from "react";
import Navbar from "../components/Navbar/Navbar";
import PostEditor from "../../posts/components/ContentBlock/PostEditor";

const HomePage = () => {
  return (
      <div>
        <Navbar/>
        <PostEditor/>
      </div>
  )
}

export default HomePage;
