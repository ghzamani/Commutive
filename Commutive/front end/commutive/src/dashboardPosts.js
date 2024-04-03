import React, { Component, useEffect, useState } from "react";
import InfiniteScroll from 'react-infinite-scroll-component';
import Post from './post.js';
import './dashboardPosts.css';
import './dashboard.css'
import DashboardNavbar from './DashboardNavbar.js';
import Sidebar from './communitySide';
function DashboardPosts() {
    const [posts, setPosts] = useState([]);
    const [hasMore, setHasMore] =useState(true);
    const[ nextPage, SetNextPage] = useState("http://localhost:8000/communities/posts/?page=1");

    useEffect(()=>{
        setHasMore(true);
        fetchData();
    })

    const fetchData = () =>
    {
        let next = nextPage;
        console.log("in fetch, next is" + nextPage)
        if(nextPage === null){
            setHasMore(false);
            return;
        }
        SetNextPage( null);
        let res= []; //if this is the response
        fetch(nextPage, {
      method: 'GET',
      headers: {
        "Authorization": "Token " + localStorage.getItem('loginToken')
      }
    })
      .then((res) => {
        if (res.status === 200) {
          return res.json()
        }
        setHasMore(false);
        return {};
      }
      )
      .then((data) => {setPosts(posts.concat(Array.from(data.results))); console.log(data);
                        SetNextPage(data.next);
    });
        //setPosts(posts.concat(Array.from(res)));
        // if(res.length === 0)
        //     setHasMore(false);
    }

    return (
        <div>
        <DashboardNavbar />
        <Sidebar location={"Home"} />
        <div className="dashboard">
        <div className="dashboardPosts">
            <InfiniteScroll
                dataLength={posts.length}
                next={fetchData}
                hasMore={hasMore}
                loader={
                // <h4>Loading...</h4>
                <div className="dashboardPosts">
                <div className="loading" />
                </div>
            }
                endMessage={
                    <p style={{ textAlign: 'center', paddingTop:"20px" }}>
                        <b>You've reached the end. Join more communities for more posts!</b>
                    </p>
                }>
                {posts.map((post) =>(
                        <div className="row justify-content-center" style={{width:"100%", margin:"0", position:"relative"}} >
                        {/* <p style={{color:"#576777", fontSize:"18px"}}><a href="" style={{color:"#552097"}}>{post.author || post.Author}</a> posted in <a style={{color:"#552097"}} href={"/community/"+post.communityID}>{post.communityID}</a>:</p> */}
                    <Post data={post} isDashboard={true} communityID={post.communityID} userState="user"/>
                    </div>
                ))}
            </InfiniteScroll>
        </div>
        </div>
        </div>
    )
}
export default DashboardPosts;