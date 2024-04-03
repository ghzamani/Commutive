import React, { Component } from 'react';
import './Post.css'
import { Button, Form, FormGroup, Label, Input, FormText } from 'react-bootstrap';
// import { AccessAlarm, ThreeDRotation } from '@material-ui/icons';
// import AddPhotoAlternateIcon from '@material-ui/icons/AddPhotoAlternate';
import Figure from 'react-bootstrap/Figure'
import { PermDeviceInformationTwoTone } from '@material-ui/icons';
import Carousel from 'react-bootstrap/Carousel'
import AttachmentIcon from '@material-ui/icons/Attachment';
import CloseIcon from '@material-ui/icons/Close';

class addPost extends Component {

    state = {
        //     profileImg:'',
        //     fileFormat: ''
        // }
        files: [],
        fileFormat: []
    }

    removeFile = (idx) => {
        //let carousel = document.getElementById("carousel");
        //carousel.carousel("next")
        const files = [...this.state.files]; // Spread syntax creates a shallow copy
        files.splice(idx, 1); // Spread again to push each selected file individually
        const fileFormat = [...this.state.fileFormat]; // Spread syntax creates a shallow copy
        fileFormat.splice(idx, 1); // Spread again to push each selected file individually
        this.setState({ files: files, fileFormat: fileFormat });
        console.log(this.state.files);
        console.log(this.state.fileFormat);

        const files2 = [...this.props.files]; // Spread syntax creates a shallow copy
        files2.splice(idx, 1); // Spread again to push each selected file individually
        console.log(files2)
        this.props.setFiles(files2);

    }
    imageHandler = (e) => {
        e.preventDefault();
        // onChangeHandler = (e) => {
        //     this.setState({file:e.target.files});
        const files = [...this.props.files]; // Spread syntax creates a shallow copy


        for (let i = 0; i < e.target.files.length; i++) {
            files.push(e.target.files[i]); // Spread again to push each selected file individually 

            console.log(e.target.files[i]);
            const reader = new FileReader();
            reader.onload = () => {
                if (reader.readyState === 2) {

                    //this.props.setProfileImg(reader.result)
                    //this.props.setProfileImg(reader.readAsDataURL(e.target.files[0]));
                    //             this.setState({ profileImg: reader.result , fileFormat:e.target.files[0].type })
                    //         }
                    //     }
                    //     reader.readAsDataURL(e.target.files[0]);
                    //     console.log(e.target.files[0])
                    //     this.props.setProfileImg(e.target.files[0]);
                    // };


                    // render() {
                    //     const { profileImg , fileFormat } = this.state
                    const files = [...this.state.files]; // Spread syntax creates a shallow copy
                    files.push(reader.result); // Spread again to push each selected file individually
                    const fileFormat = [...this.state.fileFormat]; // Spread syntax creates a shallow copy
                    fileFormat.push(e.target.files[i].type); // Spread again to push each selected file individually
                    this.setState({ files: files, fileFormat: fileFormat });
                }
            }

            reader.readAsDataURL(e.target.files[i]);

        }
        this.props.setFiles(files);

    }


    render() {
        const { files, fileFormat } = this.state
        return (
            <div  >

                <div  >

                    {files.length === 0 ? null : <Carousel id="carousel" interval={null} data-interval="false" className="img-wrap img-upload" style={{ /*backgroundColor:"#e3e3e3", backgroundImage: "linear-gradient(to right, #e3e3e3, #e8e8e8, #ededed, #f3f3f3, #f8f8f8, #fff, #fff, #fff, #f3f3f3, #ededed, #e8e8e8, #e3e3e3)",width:"40vw", height:"40vw" /*,width:"100%", height:"100%"*/ }}>
                        {files.map((data, i) => {
                            return (
                                <Carousel.Item id={"item" + i} style={{/*alignItems:"center", justifyContent:"center", verticalAlign:"middle" /*, position:"absolute", top:"0", bottom:"0"*/ }}>
                                    <div class="parent d-flex justify-content-center">

                                        {fileFormat[i].includes("image") ? <img src={data} style={{ maxWidth: "100%", maxHeight: "100%" /*,display: "block"*/, objectFit: "contain", margin: "0 auto" }} /> //age khastim aks keshide beshe maxHeight ro bardarim
                                            : fileFormat[i].includes("video") ? <div style={{ margin: "auto 8% auto 8%" }}><video class="img-fluid" playsinline controls autoplay muted loop style={{ maxWidth: "100%", maxHeight: "100%", }}>
                                                <source src={data} autoPlay loop type="video/mp4" />
                                            </video></div> :
                                                <div style={{ margin: "auto 8% auto 8%" }}>
                                                    <audio controls >
                                                        <source src={data} />
                                                    </audio></div>}
                                        <div className="btn" data-target="#carousel" data-slide-to="next" style={{ position: "absolute", right: "1%", top: "1%", zIndex:"10" }} onClick={() => this.removeFile(i)}><CloseIcon /></div>
                                    </div>
                                    {/* <img  for="photo-upload" src={data} style={{width:"200px", height:"200px"}}/> */}
                                </Carousel.Item>
                            )


                            {/* <img src={profileImg} class="img-responsive" > */ }
                            {/* <Form.File  accept="" className="" onChange={this.imageHandler} /> */ }



                        })}

                    </Carousel>}

                </div>


                <input id="photo-upload" type="file" class="img-responsive " accept="image/*,video/*,audio/*" multiple onChange={this.imageHandler} />

                <label htmlFor="photo-upload"

                >

                    <AttachmentIcon className="custom-file-upload fas" htmlFor="photo-upload" style={{ fontSize: "40px", color: "#576777" }} />
                </label>

            </div>


        );
    }
}

export default addPost;

