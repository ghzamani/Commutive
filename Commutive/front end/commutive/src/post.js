import { Row, Col } from 'react-bootstrap';
import React, { useEffect, useState } from "react";
import {Redirect} from "react-router-dom";
import { Card, CardColumns } from "react-bootstrap";
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import Carousel from 'react-bootstrap/Carousel'
import CommentBox from './CommentBox';
import ServerUrl from './constants';
import LikePost from "./likePost"
import ReportPost from './reportPost';

function Post(props) {
  const [showComment, setShowComment] = useState(true);
  const [myFile, setMyFile] = useState([]);
  const [commentCount, setCommentCount] = useState(0);
  //const [likeCount, setLikeCount] = useState(0);
  var username = localStorage.getItem("username");
  // return (
  //     <Card className="m-4" key={props.data.communityID} style={{ width:"50%", height:"50%" }}>
  //          <Card.Header style={{color: "grey"}}><img src="https://www.imagesource.com/wp-content/uploads/2019/06/Rio.jpg" alt="Avatar" class="avatar"></img> {"@" + props.data.communityID}</Card.Header>
  //       <Card.Img variant="top"   src={props.data.photo!=null? props.data.photo :"https://om.rosheta.com/upload/61e6aa724ce98c29726e423dd146e4bc9435f9ea5eca681a349a2e2ab0a23494.png"}/>

  function get_url_extension(url) {
    // if(!url.includes("http://localhost:8000")){
    //   props.data.myFile = "http://localhost:8000" + props.data.myFile
    // }
    return url.split(/[#?]/)[0].split('.').pop().trim();
  }

  function is_image(url) {
    return (/\.(gif|jpe?g|tiff?|png|webp|bmp|ico)$/i).test(url);
  }
  function is_video(url) {
    return (/\.(webm|mkv|flv|ogg|ogv|avi|mp4|mpg|mpeg|m4v|3gp|svi|flv|swf)$/i).test(url);
  }
  function is_audio(url) {
    return (/\.(3gp|mp3|tta|wav|wma|webm|aac|m4p|m4a)$/i).test(url);
  }

  useEffect(() => {
    if (props.data.urls)
    setMyFile(props.data.urls.map((d) => d.uploaded_file.includes(ServerUrl)?d.uploaded_file : ServerUrl + d.uploaded_file))
    console.log(props.data)
  }, [props.data.urls])

  return (
    <Card /*className="m-4"*/ key={props.data.id} style={props.isDashboard? { maxWidth:"80vh",width: "95%", height: "95%", marginBottom:"5%" } : props.isReport ? {maxWidth:"80vh",width:"90%",margin:"20px 0 0 0"} : {height:"90%", width:"90%", maxWidth:"80vh", margin:"0 2% 4% 2%"}}>
      <Card.Header style={{ color: "#817c8f", display:props.isDashboard?"flex": "initial" }}><img style={{objectFit:"cover"}} src={props.data.author_pic.length !== 0? props.data.author_pic[0].uploaded_file.includes(ServerUrl)?props.data.author_pic[0].uploaded_file : ServerUrl + props.data.author_pic[0].uploaded_file : "http://shirouyehzad.ir/wp-content/uploads/2019/01/user_blank.png"} alt="Avatar" class="avatar"></img> <div style={{display:"inline-block", marginLeft:"5px"}}><div style={{marginTop:"3px", marginBottom:"-3px" , marginLeft:props.isDashboard?"7px":"0"}}> { (props.data.Author? props.data.Author : props.data.author)/* + (props.isDashboard? "\n" + props.data.communityID : "")*/}</div>
      {props.isDashboard?<div style={{color:"#b2afba", paddingLeft:"25px"}}> posted in  <a style={{fontSize:"17px", paddingTop:"9px", color:"#817c8f"}} href={"/community/" + props.data.communityID} >{props.data.communityID}</a> </div>: null}</div>
      {!props.isReport && !!username && <div className="reportwrapper" style={{float:"right" , position:"absolute", right:"8px", top:"20px"}} >
          <ReportPost  communityID={props.communityID} postID={props.data.id} isAuthenticated={(!(props.userState !== "owner"/* && props.userState !== "admin"*/) || username === props.data.author || username === props.data.Author)}/>
      </div>}
      </Card.Header>
      {myFile.length === 0 ? null : myFile.length === 1 ?
        // <div className="absolutewrapper">
          <div class="showparent d-flex justify-content-center" style={{ padding:"0px"}}>
            {is_image(myFile[0]) ? <Card.Img variant="top" style={{ maxWidth: "100%", maxHeight: "100%", width:"auto", height:"auto" /*,display: "block"*/, objectFit: "contain"}} src={myFile[0]/*!=null? data:"https://om.rosheta.com/upload/61e6aa724ce98c29726e423dd146e4bc9435f9ea5eca681a349a2e2ab0a23494.png"*/} />

              : myFile[0] === null || myFile[0] === undefined ? null : is_video(myFile[0]) ?
                <div style={{ margin: "auto", width: "100%" }}>
                  <video class="img-fluid" playsInline controls loop style={{ width: "100%", height: "auto" }}>
                    <source src={myFile[0]} autoPlay loop type="video/mp4" />
                  </video></div> : is_audio(myFile[0])?
                <div style={{ margin: "15px 5px 5px 5px", width: "100%" }}><audio controls style={{ width: "100%", overflow: "hidden" }}>
                  <source src={myFile[0]} />
                </audio></div>: <div style={{maxHeight:"100%", maxWidth:"100%"}}><object data={myFile[0]}></object></div>
            }
          {/* </div> */}
        </div>
        : 
        <div className="absolutewrapper">
          <Carousel interval={null} style={{ position: "absolute", top: 0, bottom: 0, right: 0, left: 0 }}>
            {myFile.map((data, i) => {
              return (
                <Carousel.Item /*style={{justifyContent: "center!important", height:"100%"}}*/key={i} >
                  <div className="absolutewrapper">
                    <div class="showparent d-flex justify-content-center" style={{ position: "absolute", top: 0, bottom: 0, right: 0, left: 0 }}>
                      {is_image(data) ? <Card.Img variant="top" style={{ maxWidth: "100%", maxHeight: "100%", width:"auto", height:"auto"  /*,display: "block"*/, objectFit: "contain", margin: "0 auto" }} src={data/*!=null? data:"https://om.rosheta.com/upload/61e6aa724ce98c29726e423dd146e4bc9435f9ea5eca681a349a2e2ab0a23494.png"*/} />

                        : data === null || data === undefined ? null : is_video(data) ?
                          <div style={{ margin: "auto 8% auto 8%", width: "100%" }}>
                            <video class="img-fluid" playsinline controls loop style={{ width: "100%", height: "auto" }}>
                              <source src={data} autoplay loop type="video/mp4" />
                            </video></div> :
                          <div style={{ margin: "auto 8% auto 8%", width: "100%" }}><audio controls style={{ width: "100%", overflow: "hidden" }}>
                            <source src={data} />
                          </audio></div>
                      }
                    </div>
                  </div>
                </Carousel.Item>
              )
            })}
          </Carousel>
        </div>}


      {/* <video class="img-fluid" playsinline autoplay muted loop>
<source src="https://mdbootstrap.com/img/video/animation-intro.mp4" autoplay loop  type="video/mp4"/>
</video> */}
      {/* <video  controls >
    <source src="https://mdbootstrap.com/img/video/animation-intro.mp4"/>
</video> */}




      <Card.Body style={{paddingTop:"0.75rem"}}>
        {/* <Card.Title>{data.name}</Card.Title> */}
        {/* <Card.Subtitle style={{color: "grey"}}>{"@" + data.communityID}</Card.Subtitle> */}
        
        <Card.Text style={{ paddingTop: "5px",whiteSpace: "pre-wrap"}}>{props.data.caption}</Card.Text>
        <div style={{display:"flex", height:"20px", marginBottom:"30px"}}>
          {/* <button style={{ backgroundColor: "white", border: "none", outline: "none" }}>
            <FavoriteBorderIcon style={{ border: "none" }}></FavoriteBorderIcon>
          </button> */}
          {/* <p style={{marginRight:"5px", fontSize:"17px", marginTop:"1px"}}>{likeCount}</p> */}
          <LikePost communityID={props.communityID} idPost={props.data.id} userState={props.userState} /* setLikeCount={setLikeCount}*/ />
          {/* <script src="CommentBox.js" type="text/javascript"></script> */}
          
          <button style={{ backgroundColor: "white", border: "none", outline: "none", marginLeft:"5px" }} onClick={() => {if(props.userState !== "notjoined") setShowComment(!showComment)}}>
            <ChatBubbleOutlineIcon style={{ border: "none", marginLeft: "5px", display:"inline-block" }}></ChatBubbleOutlineIcon>
            <p style={{marginLeft:"5px", fontSize:"17px", marginTop:"0px", display:"inline"}}>{commentCount} comments</p>
          </button>
          
          {/* <a href={"/community/"+props.communityID+"/post/"+props.data.id} style={{ backgroundColor: "white", border: "none", outline: "none", display:"inline-block" }} >
          <ChatBubbleOutlineIcon style={{ border: "none", marginLeft: "10px" }}></ChatBubbleOutlineIcon>
          </a> */}
          {!showComment && <Redirect push to={{ pathname:"/community/"+props.communityID+"/post/"+props.data.id, state: {userState : props.userState}}} style={{ backgroundColor: "white", border: "none", outline: "none", display:"inline-block" }} >
          <ChatBubbleOutlineIcon style={{ border: "none", marginLeft: "10px" }}></ChatBubbleOutlineIcon>
          </Redirect>}
          
        </div>
        {/* <Button variant="primary" href={character.url} target="_blank">
              More Info
            </Button> */}
        {/* <a href="#" class="btn btn-primary">See Profile</a> */}
        {/* <a href={"/community/" + data.communityID} class="stretched-link" /> */}
        {props.userState !== "notjoined" ? <Card.Footer style={{ backgroundColor: "white", paddingRight:0, paddingLeft:0 }}>
          <CommentBox showComments={!showComment} communityID={props.communityID} idPost={props.data.id} setCommentCount={setCommentCount}/>
        </Card.Footer> : <p style={{ fontSize:"13px" , color:"grey", textAlign: 'center', paddingTop:"20px", borderTop:"1px solid grey" , display: "block"}}>
                        <b>Only members can see the comments.</b>
                    </p>}
      </Card.Body>
    </Card>
  )
}

export default Post;