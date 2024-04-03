import React, { Component } from 'react';

import { Button, Form, FormGroup, Label, Input, FormText } from 'react-bootstrap';
// import { AccessAlarm, ThreeDRotation } from '@material-ui/icons';
// import AddPhotoAlternateIcon from '@material-ui/icons/AddPhotoAlternate';
import Figure from 'react-bootstrap/Figure'
import './photoEvent.css'

class photoEvent extends Component {
    state = {
        profileImg:''
    }

    imageHandler = (e) => {
        e.preventDefault();
        const reader = new FileReader();
        reader.onload = () => {
            if (reader.readyState === 2) {

                //this.props.setProfileImg(reader.result)
                //this.props.setProfileImg(reader.readAsDataURL(e.target.files[0]));
                this.setState({ profileImg: reader.result })
            }
        }
        reader.readAsDataURL(e.target.files[0]);

        this.props.setProfileImg(e.target.files[0]);
    };


    render() {
        const { profileImg } = this.state
        return (
          

                     <div className="photoEvent" >
                     
                       <label htmlFor="photo-upload" 
                           className="custom-file-upload fas" >
                           <div className="img-wrap img-upload" >
                           <img  for="photo-upload" src={profileImg} style={{width:"200px", height:"200px"}}/>
                            </div>
           <input id="photo-upload" type="file"  class="img-responsive "onChange={this.imageHandler}/> 
                             {/* <img src={profileImg} class="img-responsive" > */}
                            {/* <Form.File  accept="" className="" onChange={this.imageHandler} /> */}
                                  </label>
                       </div>
                   
                
        );
    }
}

export default photoEvent;

