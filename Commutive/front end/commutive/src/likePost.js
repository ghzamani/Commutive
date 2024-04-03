import React from 'react';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import './like.css';
// import { data, map } from 'jquery';


let username ;
// const likedBy= [];

class LikePost extends React.Component {

  constructor(props){

    super(props);
    this.state ={
      likes:0,
      updated: false,
      button: true,
      comments: {Liked_By:[],likes_count:0},
    }

    this.updateLikes = this.updateLikes.bind(this);
    // this.db= this.db.bind(this);
    // this.componentWillUnmount=this.componentWillUnmount(this);
    // this.getComments=this.getComments.bind(this)

    // this.db();
  }
  componentDidMount() {
    // if (this.state.comments === undefined) {
        this.getComments();
    // }
}
getComments() {
  // if(this.props.communityID ===undefined || this.props.idPost === undefined)
  // return [];

  var headers = new Headers();
  if (!!localStorage.getItem("loginToken")) {
      headers.append('Authorization', 'Token ' + localStorage.getItem('loginToken'));
  }

  var requestOptions = {
      method: 'GET',
      headers: headers,
  };

  // let url = 'http://localhost:8000/communities/' + this.props.communityID + '/posts/' + this.props.idPost + '/';
  let url2 = 'http://localhost:8000/communities/' + this.props.communityID + '/posts/' + this.props.idPost + '/likes';
  //console.log(this.props.communityID)
  //console.log(this.props.idPost)
  fetch(url2, requestOptions)
      .then((response) => {
          console.log('response get comment', response.status);

          if (response.status === 200)
              return response.json();

          if (response.status === 403)
              return null;

          if (response.status === 401)
              
          return {};
      })
      .then((data) => {
          //console.log(data)
          if (data === null) {
              console.log("Get comments, data is null")
              this.setState({comment:[]})
              return <div />;

          }

          else {
           console.log("ll"+ data)
            this.setState({comments : data})

            //  console.log("lik"+ this.state.comments.Liked_By)
          }
               
       let username = localStorage.getItem("username");
       {data.map((like) =>
    //    console.log("lik"+ like.likes_count)
    //    console.log("lik"+ like.likes_count)
       
       
         {  this.setState({
          likes:like.likes_count
        }) 
        
           if(like.Liked_By.map(function (el) { return el.username; }).includes(username))
      
         this.setState({
            updated:true
          }) 
          
         }
       )}
    
    //    {console.log("lik"+ like.Liked_By)}
    //  if(likedBy.includes(username)){
    //     this.updated=true;
    //  }
   
  });
     
  //  {
  //     this.updated=true;
  //  }
      
}

List(data) {
  const likedBy=[]
  if (data === undefined) {
      return <div />;
  }
  return Array.from(data).map((c) => {
      return (
     
          // <Comment
          <div> likedBy={c.AllPeopleLiked[1]}</div>
          //     author={c.author}
          //     body={c.text}
          //     commentId={c.id}
          //     time={c.time}
          //     //likedCount={c.AllPeopleLiked[0]}
         
          //     communityID={this.props.communityID}
          //     idPost={this.props.idPost}
          // //time
          // />
      );
  });
}


  
  updateLikes() {

    if(!this.state.updated) {
      this.setState((prevState, props) => {
        return {
          likes: prevState.likes + 1,
          updated: true
        };

      });
      
   
    } else {

      this.setState((prevState, props) => {
        return {
          likes: prevState.likes - 1,
          updated: false
          
        };
      });

      this.setState({
        button:!this.state.button
      })

  
    }
    this.likePost();
    // this.db();
  }

//  db (){
//   componentWillUnmount =( )=>{
  
//      var resOut = null;
//       fetch("http://localhost:8000/communities/sega/posts/1/likes" , {
//       method : 'GET',
//       headers:{
//         "Authorization" : "Token " + localStorage.getItem('loginToken')
//     }
//     })
//       .then((res) => {
//         if (res.status === 200){
//             console.log(res);
            
            
//           return res.json()
//         }
//         if (res.status === 401){
        
//         }
//         if(res.status === 400){
//             console.log(res);
//         }
        
//         console.log(resOut);
       
//       }
//       )
      
//        .then((data) =>{ this.setState({data:data[0]});
//         resOut=data[0]
//         console.log(" man residam")
//         console.log(data)
//          }).then((d)=> {console.log(d);})
       
//       .catch(error => console.log('error', error));
      
      // let username = localStorage.getItem("username");
      // console.log(this.state.data);
  //    if(this.data.Liked_By.map(function (el) { return el.username; }).includes(username))
  //  {
  //     this.updated=true;
  //  }

  //  return () => { isMounted = false };
  // });
  
// }
  // componentDidMount(){
  //   this.db();
  // }

    likePost ()  { 
    // let url = "http://localhost:8000/communities/" + props.communityID + "/posts/"+"postId";
    // http://localhost:8000/communities/sega/posts/1/likes
   
    fetch("http://localhost:8000/communities/" + this.props.communityID + "/posts/"+this.props.idPost+"/likes", {
        method: 'POST',
        body:JSON.stringify(),
        
        headers: {
            "Authorization": "Token " + localStorage.getItem('loginToken')
        }
    }).then((res) => {
        console.log(res.status);
      
    }).then((res) => console.log(res));
}

  render(){
    // const changeColour = this.updateLikes ? "red" : "grey";

  

    return(
      <div>
         {/* {!this.updateLikes ?  */}
        
      
          
                <div
                    // author={c.author}
                    // body={c.text}
                    // commentId={c.id}
                    // time={c.time}
                    // likedCount={c.AllPeopleLiked[0]}
                    // likedBy={c.AllPeopleLiked[1]}
                    // likedBy={c.Liked_By}
                    // communityID={this.props.communityID}
                    // idPost={this.props.idPost}
              
                />
         
    

 {/* if(likedBy.map(f).includes(username))) */}


           <i className =  "material-icons"  style={{color:this.state.updated ? "red": "grey"}}  onClick = {() => {if(this.props.userState != "notjoined") this.updateLikes()}}><FavoriteIcon></FavoriteIcon></i> 
                                {/* // { SetUserState(false)} */}
        {/* //  : <i className =  "material-icon"  style={{color:""}} onClick = {this.updateLikes}><FavoriteBorderIcon></FavoriteBorderIcon></i>   */}
    {/* }  */}
    {/* <div className="container">
      <button className={this.state.button ? "buttonTrue": "buttonFalse"} onClick={this.updateLikes}>Click Me!</button>  
    </div> */}

{/* {this.state.likes!=0 ?
        <>{ " "+ this.state.likes+ " "}likes</> :<p></p> } */}
       <>{ " "+ this.state.likes+ " "}likes</>
        {/* <ul>
                       { data.map((like) =>
                      {if(like.Liked_By.map(function (el) { return el.username; }).includes(username))
                      this.updated=true;
                    }
                   

                              
                    )}
                    </ul> */}
                 
                </div>    
                
                

    
    );

  }


}

export default LikePost;
