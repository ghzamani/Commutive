import { Row, Col } from 'react-bootstrap';
import React, { useEffect, useState, useCallback } from "react";
import { Card, CardColumns } from "react-bootstrap";
import './Post.css';
import Post from './post';
import InfiniteScroll from 'react-infinite-scroll-component';
// import { getConfig } from '@testing-library/react';


function ListPost(props) {
  //const [data, setData] = useState([{ communityID: "saba", photo: "https://www.imagesource.com/wp-content/uploads/2019/06/Rio.jpg", myFile: ["https://images-na.ssl-images-amazon.com/images/I/71tbalAHYCL.jpg", "https://www.imagesource.com/wp-content/uploads/2019/06/Rio.jpg", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHPI4syIBtEAiO1wDxmwyKzorNnuvXArOBhQ&usqp=CAU", "http://techslides.com/demos/sample-videos/small.webm"], description: "salammmmmmmmm" }, { communityID: "parisa", myFile: [], photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHPI4syIBtEAiO1wDxmwyKzorNnuvXArOBhQ&usqp=CAU", description: "sabaaaaaaa" }]);
  const [data, setData] = useState([])
  const [tempNext, setTempNext] = useState("")
  const [nextPage, setNextPage] = useState("http://127.0.0.1:8000/communities/" + props.communityID + "/posts/?page=1");
  const [hasMore, setHasMore] =useState(true);
  function timeout(delay) {
    return new Promise(res => setTimeout(res, delay));
  }

  var triggerPostLocal = true;
  //var nextPage = "";
  useEffect(async () => {
    setTempNext( "http://127.0.0.1:8000/communities/" + props.communityID + "/posts/?page=1");
    await timeout(20);
    fetchData();
  }, [triggerPostLocal]);

  useEffect( async()=>{
    setHasMore(true);
    setTempNext("http://127.0.0.1:8000/communities/" + props.communityID + "/posts/?page=1")
    setData([]);
    await timeout(20);
  }, [props.triggerPost])

  useEffect(()=>{
    console.log("i'm in here with my pal " + tempNext)
    setNextPage(tempNext);
  }, [data, tempNext])

  const fetchData = useCallback(()=>{
    // setHasMore(false);
    if(!nextPage.includes("posts/?page" || nextPage.includes("undefined"))){
      triggerPostLocal = !triggerPostLocal;
      return;
    }
    console.log("i stayed in fetch!")
    fetch(nextPage,
    props.userState !== "notjoined" ? {
      method: 'GET',
      
      headers: {
        "Authorization": "Token " + localStorage.getItem('loginToken')
      }
    } :
    {
      method: 'GET'
    } 
    )
      .then((res) => {
        if (res.status === 200) {
          return res.json()
        }
        setHasMore(false);
        return {};
      }
      )
      .then((d) => {
        setTempNext( d.next);
        if(data!= undefined){
          setData(Array.from(data.concat(Array.from(d.results))));
        }
        else{
          setData(Array.from(d.results));
        }
        if(d.next === null){
          setHasMore(false);
        }
      });
  }, [nextPage])


  return (


    <div className="potlist">
      <div style={{/*position: "absolute", top:"200px", zIndex: "1" , white-space: nowrap;*/ }}>
        <Row className="justify-content-center" style={{ width: "100%" /*,position: "absolute" ,top: "100px" , left:"0px"*/, zIndex: "1", margin: "0" }}  >

          {/*           
              <CardColumns> */}




          {props.userState === "notjoined" && data.length > 5?
            (
              <>
                {data.slice(0, 5).map((data) => {
                  if (data) return (
                    <Post id={data.id} data={data} communityID={props.communityID} userState={props.userState} />
                  )
                })}
                <p style={{ textAlign: 'center', paddingTop: "15px",width:"100%" }}>
                  <b>Want to see more posts? Join!</b>
                </p>
              </>

            )
            :
            (
              <InfiniteScroll
              scrollThreshold="90%"
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
                    <p style={{ textAlign: 'center', color:"#576777",width:"100%" }}>
                        <b>No more posts to show.</b>
                    </p>
                }
                scrollableTarget="potlist"
                >
                   <Row className="justify-content-center" style={{ width: "100%", zIndex: "1", margin: "0" }}  >
              {data.map((data) => {
                if (data) return (
                  <Post id={data.id} data={data} communityID={props.communityID} userState={props.userState}/>
                )
              })}
              </Row>
              </InfiniteScroll>)
            
        }
          {/* {data.map((data) => { if(data) return(

<figure className="m-4" key={data.communityID} style={{ width: "16rem" }}>
<title  style={{color: "grey"}}>{"@" + data.communityID}</title>
< img  variant="top" src={data.photo!=null? data.photo :"https://om.rosheta.com/upload/61e6aa724ce98c29726e423dd146e4bc9435f9ea5eca681a349a2e2ab0a23494.png"}/>     
<figcaption style={{paddingTop: "5px"}}>{data.description}</figcaption>
</figure>)
})} 
 */}


        </Row>
        {/* </CardColumns> */}



        {/* <Switch>
          <Route exact path="/">

          </Route>
        </Switch> */}
        {/* </Router> */}

      </div>
    </div>

  );
}
export default ListPost;


