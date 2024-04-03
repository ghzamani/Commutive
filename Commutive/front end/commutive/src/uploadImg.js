import React, { Component } from 'react';
import './uploadImg.css'
import { Button, Form, FormGroup, Label, Input, FormText } from 'react-bootstrap';
// import { AccessAlarm, ThreeDRotation } from '@material-ui/icons';
// import AddPhotoAlternateIcon from '@material-ui/icons/AddPhotoAlternate';

class UploadImg extends Component {
    state = {
        profileImg: 'https://cdn.onlinewebfonts.com/svg/img_234957.png'
    }

    imageHandler = (e) => {
        if(e.target?.files?.length > 0){
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
        }
        else{
            this.setState({ profileImg: 'https://cdn.onlinewebfonts.com/svg/img_234957.png' })
            this.props.setProfileImg("");
        }
        
    };


    render() {
        const { profileImg } = this.state
        return (
            <Form>
                <Form.Group>
                    <div className="img-holder">
                        <div className="borderProOreview">
                            <img src={profileImg} alt="" id="img" className="img" />
                            <Form.File id="uploadImg" accept="image/*" className="butChoose" onChange={this.imageHandler} />
                        </div>
                    </div>
                </Form.Group>
            </Form >
        );
    }
}

export default UploadImg;

