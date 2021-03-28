import React from "react";
import { Carousel } from "react-responsive-carousel";
import img1 from "./images/To Do.png";
import img2 from "./images/Notes.png";
import img3 from "./images/Diary.png";
import img4 from "./images/Upload File's.png";
import img5 from "./images/Live Chat.png";
import img6 from "./images/Team Leader Managing Project (1).png";
import img7 from "./images/team work.png";

export default () => (
    <div >
  <Carousel autoPlay showThumbs={false} infiniteLoop={true}>
    <div>
      <img alt="" src={img1} />
    </div>
    <div>
      <img alt="" src={img2} />
    </div>
    <div>
      <img alt="" src={img3} />
    </div>
    <div>
      <img alt="" src={img4} />
    </div>
    <div>
      <img alt="" src={img5} />
    </div>
    <div>
      <img alt="" src={img6} />
    </div>
    <div>
      <img alt="" src={img7} />
    </div>
    
  </Carousel>
  </div>
);
