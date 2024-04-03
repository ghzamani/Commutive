import React from 'react';
import CloseIcon from '@material-ui/icons/Close';

export default class PictureUploader extends React.Component {
  constructor(props) {
    super(props);

    // this.state = {
    //   picture: false,
    //    src: this.props.photo
    //   // src:this.props.src
    // }
  }

  componentWillReceiveProps(nextProps) {
    console.log("i'm hereeee");
    if (nextProps.photo !== this.props.src || !nextProps.status?.edit) {
      // this.setState({ src: nextProps.photo });
    }
  }

  removeFile(){
    this.props.setSrc(null)
    this.props.setPhoto(null)
  }

  handlePictureSelected(event) {
    //var picture = event.target.files[0];
    //var src     = URL.createObjectURL(picture);
    if(event.target?.files?.length > 0){
      console.log("sth");
    const reader = new FileReader();
        reader.onload = () => {
            if (reader.readyState === 2) {

                //this.props.setProfileImg(reader.result)
                //this.props.setProfileImg(reader.readAsDataURL(e.target.files[0]));
                this.props.setSrc(reader.result)
            }
        }
    reader.readAsDataURL(event.target.files[0]);
    this.props.setPhoto(event.target.files[0])
    // this.setState({
    //   picture: picture,
    //   src: src
    // });
  }
}

  renderPreview() {
    console.log("i'm rendering" + this.props.src)
    if(this.props.src) {
      return (
        <div style={{width:"200px",height: "200px", position:"relative"}}>
        <div className="btn" style={{ position: "absolute", right: "1%", top: "1%", zIndex:"10" }} onClick={() => this.removeFile()}><CloseIcon /></div>
        <img src={this.props.src} style={{width:"200px",height: "200px", objectFit:"cover"}}  />
        </div>
      );
    } else {
      return (
        <p style={{width:"200px",height: "200px", textAlign:"center", padding:"98px 0"}}>
          <p>
          No Image
          </p>
        </p>
      );
    }
  }

  upload() {
    var formData = new FormData();

    formData.append("file", this.props.picture);

    fetch({
      url: " http://127.0.0.1:8000/update-community/",
      method: "POST",
      data: formData,
      cache: false,
      contentType: false,
      processData: false,
      success: function(response) {
        // Code to handle a succesful upload
      }
    });
  }

  render() {
    return (
      <div style={{width:"100%", justifyContent:"center"}}>
        {/* <h5>Picture Uploader</h5> */}
       
        <div style={{margin:"0 auto", width:"fit-content"}}>
        {this.renderPreview()} 
        </div>
        <br/>
        {this.props.status.edit?
        <input 
        style={{overflow:"hidden"}}
          type="file"
          accept="image/*"
          onChange={this.handlePictureSelected.bind(this)}
        /> : null}
        <hr/>
        {/* <button
          onClick={this.upload.bind(this)}
        >
          Upload
        </button> */}
      </div>
    );
  }
}