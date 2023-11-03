import React from "react";
import mapimage from "../images/map.png";
import map1 from "../images/map1.jfif";
import "./Display.css";
const display = () => {
  return (
    <>
      <div className="map">
        <img src={mapimage} className="bgimg" alt="" />

        <div className="mapimage">
          <img src={map1} alt=""/>
        </div>
        <div className="container">
          <h3 >Basic Information</h3>

          <form>
            <div className="info">
              
                <label className="item">
                  Name:
                  <input type="text" name="name" />
                </label>
              
                <label  className="item">
                  Services:
                  <input type="text" name="name" />
                </label>
              
              <h3> Opening Hours</h3>
              
               
                <label className="item">
                  From:
                  <input type="time"></input>
                </label>
               
                <label className="item">
                  To:
                  <input type="time"></input>
                </label>
                < h3>Location Information</h3>
              
                <label  className="item">
                 District:
                  <input type="text" name="name" />
                </label>
              
              
                <label  className="item">
                 Taluko:
                  <input type="text" name="name" />
                </label>
              
             <h3>Add Photo of a Location </h3>
              <input type ="file" className="item" />
               
                

             
              <input type="submit" class="button"value="Add a Location " />
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default display;
