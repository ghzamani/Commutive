import React from "react";
import { useState, useEffect } from "react";
import ShowMoreText from 'react-show-more-text';
import { Card } from "react-bootstrap";
import Post from './post'
import InfiniteScroll from 'react-infinite-scroll-component';
function ReportList(props) {
    const [data, setData] = useState([]);
    const [triggerReload, setTriggerReload] = useState(false);
    const [hasMore, setHasMore] =useState(true);
    const[ nextPage, SetNextPage] = useState("");
    useEffect(() => {
        if (props.communityID != undefined) {
            SetNextPage("http://127.0.0.1:8000/communities/" + props.communityID + "/post/reports/?page=1");
            setData([])
            fetchData();
        }

    }, [props.communityID, triggerReload]);

    const fetchData = () => {
        //let url = "http://localhost:8000/communities/" + props.communityID;
        console.log("next page is:" + nextPage);
        if(nextPage== null || !nextPage.includes('/reports')){
            setTriggerReload(!triggerReload);
        }
            fetch(nextPage/* + "/post/reports"*/, {
                method: 'GET',
                headers: {
                    "Authorization": "Token " + localStorage.getItem('loginToken')
                }
            })
                .then((res) => {
                    console.warn(res)
                    if (res.status === 200) {
                        return res.json()
                    }
                    setHasMore(false);
                    if (res.status === 401) {
                        window.location.replace("/sign-in")
                    }
                    if (res.status === 403) {
                        console.log(res);
                    }
                    return {};
                }
                )
                .then((d) => {
                    console.warn(d)
                    if(data!= undefined){
                        setData(Array.from(data.concat(Array.from(d.results))));
                      }
                      else{
                        setData(Array.from(d.results));
                      }
                      console.log(d);
                      if(d.next == null){
                        setHasMore(false);
                      }
                      SetNextPage(d.next);
                })
                .catch(error => console.log('error', error));
    }

    const deletePost = (postId) => {
        let url = "http://localhost:8000/communities/" + props.communityID;
        url = url + "/posts/";
        url = url + postId + "/acceptreport";
        console.log("url is " + url);
        fetch(url, {
            method: 'DELETE',
            headers: {
                "Authorization": "Token " + localStorage.getItem('loginToken')
            }
        }).then((res) => {
            console.log(res.status);
            if (res.status === 204 || res.status === 201) {
                //ok!
                setTriggerReload(!triggerReload);
            }
            console.log(res);
        }).then((res) => console.log(res));
    }

    const unreportPost = (postId) => {
        let url = "http://localhost:8000/communities/" + props.communityID + "/posts/" + postId + "/unreport"
        fetch(url, {
            method: 'DELETE',
            headers: {
                "Authorization": "Token " + localStorage.getItem('loginToken')
            }
        }).then((res) => {
            console.log(res.status);
            if (res.status === 204) {
                //ok!
                setTriggerReload(!triggerReload);
            }
        });
    }

    return (
        <>
            {/* {data.length == 0 ?
                        <div style={{ color: "#576777", fontSize: "35px", width: "100%", height: "100%" }}> No Reports!</div> : */}
            <div>
            <div className="row justify-content-center" style={{width:"100%", margin:"0"}} >
            <InfiniteScroll
                dataLength={data.length}
                next={fetchData}
                hasMore={hasMore}
                loader={
                // <h4>Loading...</h4>
                <div style={{width: "100%", justifyContent:"center", display:"flex"}}>
                <div className="loading" />
                </div>
            }
                endMessage={
                    <p style={{ textAlign: 'center', paddingTop:"20px" }}>
                        <b>No More Reports.</b>
                    </p>
                }>
                <ul>
                    {
                        data.map((report) => {if (data) return(
                            <div id={report.id} className="piece report-piece">
                                <div style={{ display: "flex" }}>
                                    <div id="reporters-container" >
                                    <div style={{ display: "flex", float: "right" }}>
                                            <button className="report-button" onClick={() => deletePost(report.id)} >Delete</button>
                                            <button style={{ display: "inline-block" }} className="report-button" onClick={() => unreportPost(report.id)}>Keep</button>
                                        </div>
                                        <div style={{ fontSize: "17px" }}>
                                            <ShowMoreText
                                                lines={1}
                                                more='and more'
                                                less='(show less)'
                                                className='content-css'
                                                anchorClass='my-anchor-css-class'
                                                expanded={false}

                                            >
                                                {report.AllPeopleReports[0].Reported_By.map(function (el) { return el.username; }).join(", ")}
                                            </ShowMoreText>
                                        </div>
                                        <div style={{ color: "#576777", fontSize: "16px" }}>{report.AllPeopleReports[0].reports_count === 1 ? "has" : "have"} reported this post:</div>
                                        
                                    </div>

                                </div>
                                <div className="row justify-content-center" style={{width:"100%", margin:"0"}} >
                                 <Post data={report} communityID={props.communityID} isReport={true} userState="owner"/> 
                                 </div>
                                {/* <div>
                                    <Card key={report.id} style={{ width: "100%", height: "50%" }}>
                                        <Card.Header style={{ color: "grey" }}>{"@" + report.author} <div style={{ display: "flex", float: "right" }}>
                                            <button className="report-button" onClick={() => deletePost(report.id)} >Delete</button>
                                            <button style={{ display: "inline-block" }} className="report-button" onClick={() => unreportPost(report.id)}>Keep</button>
                                        </div></Card.Header>
                                        <Card.Img variant="top" src={report.myFile != null ? "http://localhost:8000" + report.myFile : null} />


                                        <Card.Body>
                                            <Card.Text style={{ paddingTop: "5px" }}>{report.caption}</Card.Text>
                                            <Card.Footer>
                                            </Card.Footer>


                                        </Card.Body>
                                    </Card>
                                </div> */}
                            </div>
                        )})}
                </ul>
                </InfiniteScroll>
                </div>
            </div>
        </>)
}



export default ReportList;
