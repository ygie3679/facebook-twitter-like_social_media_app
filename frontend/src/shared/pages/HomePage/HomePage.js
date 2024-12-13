import React, {useState} from "react";
import Navbar from "../../components/Navbar/Navbar";
import PostEditor from "../../../posts/components/PostEditor/PostEditor";
import LeftMenu from "../../components/FormElements/LeftMenu";
import "./HomePage.css";

const HomePage = () => {

  return (
      <div className='page-container'>
        <div className="out-container">
          <Navbar/>
        </div>
        <div className="column-container">
          <div className="left-column">
            <LeftMenu/>
          </div>
          <div className="mid-column">
            <PostEditor/>
          </div>

        </div>
      </div>
  )
}

export default HomePage;
