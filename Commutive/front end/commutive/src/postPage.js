import { Row, Col } from 'react-bootstrap';
import React, { useEffect, useState,useRef } from "react";
import { Card, CardColumns } from "react-bootstrap";
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import Carousel from 'react-bootstrap/Carousel'
import CommentBox from './CommentBox';
import ServerUrl from './constants';
import LikePost from "./likePost"
import ReportPost from './reportPost';
import DashboardNavbar from './DashboardNavbar.js';
import Sidebar from './communitySide';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

function PostPage(props) {
    let urlSplitted = window.location.href.match(/[^\/]+/g);
    let postID = urlSplitted[urlSplitted.length - 1];
    let communityID = urlSplitted[urlSplitted.length - 3];
    const [loading, SetLoading] = useState(true);
    const [showComment, setShowComment] = useState(true);
    const [myFile, setMyFile] = useState([]);
    const [data, setData] = useState();
    const [userState, SetUserState] = useState("notjoined");
    const [postExists, SetPostExits] = useState(true);
    const [commentCount, setCommentCount] = useState(0);
  //const [likeCount, setLikeCount] = useState(0);
    const commentsRef = useRef(null)
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

    useEffect(async() => {
        if (props.location.state?.userState) {
            SetUserState(props.location.state.userState);
        }
        else {
            await fetch('http://localhost:8000/communities/' + communityID,
                {
                    method: 'GET'
                })
                .then(
                    res => res.json()
                ).then(
                    resOut => {
                        SetUserState("notjoined");
                        let username = localStorage.getItem("username");
                        if (resOut.owner_name === username) {
                            SetUserState("owner");
                        }
                        else if (resOut.admin_name === username) {
                            SetUserState("admin");
                        }
                        else if (resOut.members_name !== undefined) {
                            console.log(resOut.members_name);
                            if (resOut.members_name.map(function (el) { return el.username; }).includes(username)) {
                                SetUserState("user");
                            }
                        }

                    }
                )
        }
        let tempData = null;
        await fetch("http://localhost:8000/communities/" + communityID + "/posts/" + postID,
            {
                method: 'GET',

                headers: {
                    "Authorization": "Token " + localStorage.getItem('loginToken')
                }
            }
        )
            .then((res) => {
                if (res.status === 200) {
                    return res.json()
                }
                if (res.status === 500) {
                    SetPostExits(false);
                }
                return {};
            }
            )
            .then((d) => {
                setData(d);
                tempData = d;
                if (tempData.urls)
                    setMyFile(tempData.urls.map((d) => d.uploaded_file.includes(ServerUrl) ? d.uploaded_file : ServerUrl + d.uploaded_file))
                console.log(tempData)
                SetLoading(false);
                
            });

    }, [props.location.state])

    useEffect(()=>{
        if(!loading && postExists && userState !== "notjoined")
            commentsRef?.current.scrollIntoView({behavior: 'smooth'}) 
    }, [loading, postExists, userState])

    return (
        loading ?
            <div></div>
            
                    :
                    postExists && userState !== "notjoined"?
                    <> 
                    <div className="post-page-wrapper">
                        <DashboardNavbar />
                        <Sidebar location="PostPage" />
                        <div className="post-page">
                            <div className=" flexbox-container row justify-content-center" style={{margin:"0", background:"#362f3d"}} >
                                {myFile.length === 0 || myFile[0] === null || myFile[0] === undefined ? null :
                                <div className="col-12 col-md-8 col-lg-8 files">
                                    { myFile.length === 1 ?
                                        <div class="showparent d-flex justify-content-center" style={{ padding: "0px", height:"100%" }}>
                                            {is_image(myFile[0]) ? <Card.Img variant="top" style={{ maxWidth: "100%", maxHeight: "100%", width: "auto", height: "auto" /*,display: "block", objectFit: "none"*/ }} src={myFile[0]} />

                                                : is_video(myFile[0]) ?
                                                    <div style={{ margin: "auto", width: "100%", height: "100%" }}>
                                                        <video class="img-fluid" playsInline controls loop style={{ width: "100%" , height: "100%" ,objectFit:"contain", outline:"none"}}>
                                                            <source src={myFile[0]} autoplay loop type="video/mp4" />
                                                        </video></div> : is_audio(myFile[0]) ?
                                                        <div style={{ margin: "auto", width: "100%" }}><audio controls style={{ width: "100%", overflow: "hidden" }}>
                                                            <source src={myFile[0]} />
                                                        </audio></div> : <div style={{ maxHeight: "100%", maxWidth: "100%" }}><object data={myFile[0]}></object></div>
                                            }
                                        </div>
                                        :
                                        <div className="">
                                            <Carousel interval={null} style={{ position: "absolute", top: 0, bottom: 0, right: 0, left: 0 }}>
                                                {myFile.map((data, i) => {
                                                    return (
                                                        <Carousel.Item className="files-container"/*style={{justifyContent: "center!important", height:"100%"}}*/>
                                                            <div className="">
                                                                <div class="showparent d-flex justify-content-center" style={{ position: "absolute", top: 0, bottom: 0, right: 0, left: 0, padding: "15px 50px 50px 50px", height: "calc(100vh - 60px)" }}>

                                                                    {is_image(data) ? <Card.Img variant="top" style={{ maxWidth: "100%", maxHeight: "100%", width: "auto", height: "auto"  /*,display: "block"*/, objectFit: "contain", margin: "0 auto" }} src={data} />

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
                                </div>}
                                <div ref={commentsRef} className={myFile.length !== 0 ?"col-12 col-md-4 col-lg-4 rightcolumn": "col-12 col-sm-10 rightcolumn"} style={{backgroundColor: "white"}}>
                                    <div className="rightcontent">
                                        <div className="backButton" style={{height:"60px", fontSize:"20px", paddingTop:"15px", color:"#e3e3e3"}}>
                                        <a href={"/community/" + communityID}><ArrowBackIcon /> Go to {communityID}</a>
                                        </div>
                                        <div>
                                        <div style={{ display: "initial" }}><img style={{objectFit:"cover"}} src={data.author_pic.length !== 0? data.author_pic[0].uploaded_file.includes(ServerUrl)?data.author_pic[0].uploaded_file : ServerUrl + data.author_pic[0].uploaded_file : "http://shirouyehzad.ir/wp-content/uploads/2019/01/user_blank.png"} alt="Avatar" class="avatar"></img> <div style={{ display: "inline-block", marginLeft: "5px" }}><div style={{ marginTop: "3px", marginBottom: "-3px" }}> {(data.Author ? data.Author : data.author)}</div>
                                        </div>
                                            <div className="reportwrapper" style={{ float: "right", display:"inline-block", marginTop:"7px" }} >
                                                <ReportPost communityID={communityID} postID={data.id} isAuthenticated={(!(props.userState !== "owner"/* && props.userState !== "admin"*/) || username === data.author || username === data.Author)}/>
                                            </div>
                                        </div>
                                        </div>
                                        <Card.Text style={{ paddingTop: "10px",whiteSpace: "pre-wrap" }}>{data.caption}</Card.Text>
                                        <div style={{ display: "flex", height: "20px", marginBottom: "30px" }}>
                                        {/* <p style={{marginRight:"5px", fontSize:"17px", marginTop:"1px"}}>{likeCount}</p> */}
                                            <LikePost communityID={communityID} idPost={data.id} userState={userState}/* setLikeCount={setLikeCount}*/ />
                                            
                                            <button style={{ backgroundColor: "white", border: "none", outline: "none", marginLeft:"5px"}}>
                                                <ChatBubbleOutlineIcon style={{ border: "none", marginLeft: "5px", display:"inline-block"  }}></ChatBubbleOutlineIcon>
                                                <p style={{marginLeft:"5px", fontSize:"17px", display:"inline"}}>{commentCount} comments</p>
                                            </button>
                                        </div>
                                        <div style= {{ borderTop: "1px solid rgba(0,0,0,.125)" }}>
                                           
                                            <CommentBox showComments={true} communityID={communityID} idPost={data.id} setCommentCount={setCommentCount} />
                                            </div> 
                                    </div>
                                </div>
                            </div>
                        </div>
                        </div>
                        </>
                            :
                            !postExists ?
                                <div className="exceptional-page">
                                    <h3>Sorry, This post does not exist...</h3>
                                    <a href={"/community/" + communityID}>Go back to {communityID}.</a>
                                </div>
                                :
                                    <div className="exceptional-page">
                                        <h3>You don't have the permission to see this post.</h3>
                                        <a href={"/community/" + communityID}>Go back to {communityID}.</a>
                                    </div>
                    
                    
    )
}

export default PostPage;