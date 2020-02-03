import React, { useState } from "react";
import { connect } from "react-redux";
import * as dispatchers from "../../../actions/actionCreators"
import CheckIcon from '@material-ui/icons/Check';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import DropDown from "../../dropDown/DropDown";
import { Link } from "react-router-dom";
import { TextField, Select, MenuItem } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import {
  Section1,
  NavigationSection1,
  Addtitle,
  Section2,
  Section3,
  Title,
  Section2b,
  ExportImg
} from "../EditRecipe.styles";

import foodplaceholder from "../../../images/foodplaceholder.png";
import axios from "axios";

function Step2(props) {
  const [imgUrl, setImgUrl] = useState(false);
  const { goForward, addImagesToBody } = props;

  const onSubmit = e => {
    e.preventDefault();
    addImagesToBody(imgUrl)
    goForward(e);
  };

  const uploadImage = async e => {
    e.preventDefault();
    try {
      const files = e.target.files;
      const data = new FormData();
      data.append("file", files[0]);
      data.append("upload_preset", "recipe_image");
      const imageUrl = await axios .post("https://api.cloudinary.com/v1_1/dr34bum3p/image/upload", data)
      // Then
      setImgUrl([imageUrl.data.secure_url])
    } catch (error) {
      console.log(error)
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <Section3>
      <NavigationSection1>
            <Link to='/profile'>
              <ArrowBackIcon cgit style={{ fontSize: 40, color: 'white' }} />
            </Link>
          <button type='submit' style={{"border":"none", "background": "inherit", "outline":"none"}}>
          <CheckIcon cgit style={{ fontSize: 40, color: 'white', background:'transparent' }} />
        </button>
        </NavigationSection1>
        <Addtitle>
       <h1>
        Upload Image
        </h1>
        </Addtitle>
      </Section3>
      <ExportImg>
        <div>
          <div >
          {imgUrl 
            ? <img style={{"max-height": "394px", "width": "100%"}} alt="image to uploaded" src={imgUrl} />
            : <img src={foodplaceholder} alt="A display of the already finished recipe" />
          }
          </div>
          <div>
          <input
            type="file"
            onChange={uploadImage}
            name="imageUrl"
            placeholder="imageUrl"
          />
        </div>
        </div>
    </ExportImg>
   </form>
      
  );
}

export default connect(state => state, dispatchers)(Step2);