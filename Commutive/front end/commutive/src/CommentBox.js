import React, { useState } from 'react';
import Component from 'react';
import ReactDOM from 'react-dom';
import Form from 'react-bootstrap';
import './CommentBox.css';
import SendIcon from '@material-ui/icons/Send';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite'
import { data, map } from 'jquery';

class CommentBox extends React.Component {
    constructor() {
        super();
        this.state = {
            comments: undefined,
        };
        this.handelCountOfComments = this.getCommentsTitle.bind(this);
        this.checkAddNewComment = false;
        this.countImaginary = null;

    }

    componentDidMount() {
        if (this.state.comments === undefined) {
            this.getComments();
        }
    }

    render() {
        return (
            <div className='i' >
                <div className='comment-box'>

                    {/* <h4 style={{ fontFamily: 'cursive', color: 'black' }}>Comments</h4> */}
                    {/* <h6 style={{ fontFamily: 'cursive' }} className='comment-count'>
                        {this.checkAddNewComment ? this.getCommentsTitle(this.countImaginary) : this.handelCountOfComments}
                    </h6> */}
                    {this.props.showComments ? <div className='comment-list'>{this.commentList(this.state.comments)}</div> : <div />}
                    <CommentForm addComment={this._addComment.bind(this)} communityID={this.props.communityID} idPost={this.props.idPost} showComments={this.props.showComments}/>
                </div>
            </div>
        );
    }

    _addComment(author, text, id) {
        if (author === undefined && text === undefined)
            return;
        else {
            const comment = {
                author,
                text,
                id,
            };
            this.checkAddNewComment = true;
            this.setState({ comments: [...this.state.comments, comment] });
        }
    }

    handleClick() {
        this.setState({
            showComments: !this.state.showComments,
        });
    }

    getComments() {
        var headers = new Headers();
        if (!!localStorage.getItem("loginToken")) {
            headers.append('Authorization', 'Token ' + localStorage.getItem('loginToken'));
        }

        var requestOptions = {
            method: 'GET',
            headers: headers,
        };

        let url = 'http://localhost:8000/communities/' + this.props.communityID + '/posts/' + this.props.idPost + '/comments/';
        let url2 = 'http://localhost:8000/communities/sega/posts/1/comments/';
        fetch(url, requestOptions)
            .then((response) => {

                if (response.status === 200)
                    return response.json();

                if (response.status === 403)
                    return null;

                if (response.status === 401)
                    this.props.history.replace({ pathname: '/sign-in', state: { from: window.location.href.replace('http://localhost:3000', '') } })
                return {};
            })
            .then((data) => {
                if (data === null) {
                    this.setState({ comment: [] })
                    return <div />;
                }
                else {
                    this.getCommentsTitle(data.length);
                    this.props.setCommentCount( data.length )
                    this.setState({ comments: data })
                }
            });
    }

    commentList(data) {
        if (data === undefined) {
            return <div />;
        }
        return Array.from(data).map((c) => {
            return (
                <Comment
                    author={c.author}
                    body={c.text}
                    commentId={c.id}
                    time={c.time}
                    key={c.id}
                    communityID={this.props.communityID}
                    idPost={this.props.idPost}
                //time
                />
            );
        });
    }

    getCommentsTitle = (commentCount) => {
        this.countImaginary = commentCount + 1;

        if (commentCount === undefined) {
            this.handelCountOfComments = 'No comments yet';
        }
        else if (commentCount === 0) {
            this.handelCountOfComments = 'No comments yet';
        }
        else if (commentCount === 1) {
            this.handelCountOfComments = '1 comment';
        }
        else {
            this.handelCountOfComments = `${commentCount} comments`;
        }
    }
}

class CommentForm extends React.Component {
    constructor() {
        super();
        this.state = {
            txt: '',
        };

        this.handleTextChange = this.handleTextChange.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
    }

    render() {
        return (
            <form className={!this.props.showComments ? "comment-form" : "comment-form-page"} >
                <div className='comment-form-fields'>
                    <div className='commentInputBox'>
                        <textarea style={{ border: 'none', width: '91%', paddingLeft: '5px', paddingTop: '5px', outline: 'none', }} placeholder='Add your Comment' rows='2' value={this.state.txt} onChange={this.handleTextChange} ></textarea>
                        <button className='icon-send' style={{ backgroundColor: 'transparent', border: 'none', outline: 'none', float: 'right', marginTop: '10px', }} onClick={this.handleFormSubmit} >
                            <SendIcon style={{ backgroundColor: 'white', color: 'black', float: 'right', marginBottom: '5px', outline: 'none', }} onClick={this.createComment}></SendIcon>
                        </button>

                    </div>
                </div>
            </form>
        );
    }

    createComment = (e) => {
        e.preventDefault()
        var myHeaders = new Headers();

        if (!!localStorage.getItem("loginToken")) {
            myHeaders.append("Authorization", "Token " + localStorage.getItem('loginToken'));
        }
        myHeaders.append("Content-Type", "application/json");

        var UserCourse = {}
        UserCourse.text = this.state.txt;
        var raw = JSON.stringify(UserCourse);

        var requestOptions =
        {
            method: 'POST',
            headers: myHeaders,
            body: raw,
        };

        let url = 'http://localhost:8000/communities/' + this.props.communityID + '/posts/' + this.props.idPost + '/comments/';
        let url2 = 'http://localhost:8000/communities/sega/posts/1/comments/';

        let author;
        let body;
        let id;
        fetch(url, requestOptions)
            .then(async (response) => {
                //console.log('response create comment', response.status)

                if (response.status === 401) {
                    //window.location.href("http://localhost:3000/sign-in");
                    this.props.history.replace({ pathname: '/sign-in', state: { from: window.location.href.replace('http://localhost:3000', '') } });
                    return;
                }

                if (response.status === 401) {
                    return;
                }

                else if (response.status === 403) {
                    return null;
                }

                return response.json()
            }).then(rep => {
                console.log("rep", rep);
                if (data === null) {
                    return <div />;
                }
                else {
                    for (let key in rep) {
                        switch (key) {
                            case "text":
                                body = rep[key];
                                break;

                            case "author":
                                author = rep[key];
                                break;

                            case "id":
                                id = rep[key];
                                break;
                        }
                    }
                    if (body == "This field may not be blank.")
                        return;
                    else{
                        this.props.addComment(author, body, id)
                        if(!this.props.showComments){
                            window.location.replace("/community/"+this.props.communityID+"/post/"+this.props.idPost)
                        }
                    }
                }
            })
    }

    handleTextChange(e) {
        this.setState({ txt: e.target.value });
    }

    handleFormSubmit = (e) => {
        this.setState({ txt: " " });
    }
}

class Comment extends React.Component {
    constructor() {
        super();
        this.state = {
            countOfLiked: 0,
            likedBy: [],
            checkLike: true,
            user: localStorage.getItem("username"),
            checkCountOfLiked: true,
            check: false
        };
        this.handleCheckLike = this.handleCheckLike.bind(this)
        //this.checkCountOfLiked=true;

    }

    componentDidMount() {
        this.likeCommentGET();
    }

    render() {
        return (
            <div className='comment'>
                <p className='comment-header'>
                    {this.props.author}
                    <button className="comment-likeCount" onClick={this.handleCheckLike} >
                        <FavoriteIcon className={this.state.checkLike ? "comment-likeCountfalse" : "comment-likeCounttrue"} onClick={this.likeCommentPOST} style={{ fontSize: 20 }}></FavoriteIcon>
                    </button>
                </p>
                <p className='comment-body'>{this.props.body}</p>
                <p className="reply-countOfLiked" style={{ marginBottom: "auto" }}>
                    {this.state.checkCountOfLiked
                        ?
                        <span className="countOfLiked" >
                            {this.state.countOfLiked} likes
                 </span>
                        :
                        <></>
                    }
                    {/* <button className="reply_button">
                        Reply
                </button> */}
                </p>
            </div>
        );
    }

    handleReply(value) {
        <CommentForm repUser={value} />
    }

    handleCheckLike() {
        if (this.state.checkLike)
            this.setState({ checkLike: !this.state.checkLike, countOfLiked: this.state.countOfLiked + 1})
        else 
            this.setState({ checkLike: !this.state.checkLike, countOfLiked: this.state.countOfLiked - 1})

    }

    likeCommentPOST = (e) => {

        var myHeaders = new Headers();
        if (!!localStorage.getItem("loginToken")) {
            myHeaders.append("Authorization", "Token " + localStorage.getItem('loginToken'));
        }
        myHeaders.append("Content-Type", "application/json");

        var UserCourse = {}
        var raw = JSON.stringify(UserCourse);

        var requestOptions =
        {
            method: 'POST',
            headers: myHeaders,
            body: raw

        };

        let url;
        if (this.props.commentId == undefined) {
            console.log(this.props.key)
            url = 'http://localhost:8000/communities/' + this.props.communityID + '/posts/' + this.props.idPost + '/comments/' + this.props.key + '/likes';
        }
        else {
            url = 'http://localhost:8000/communities/' + this.props.communityID + '/posts/' + this.props.idPost + '/comments/' + this.props.commentId + '/likes';
        }

        let url2 = "http://localhost:8000/communities/sega/posts/1/comments/5/likes";
        console.log(url)
        fetch(url, requestOptions)
            .then((response) => {
                console.log("response post like comment:", response)

                if (response.status === 400)
                    console.log("this user liked before")

                if (response.status === 401) {
                    //window.location.href("http://localhost:3000/sign-in");
                    //this.props.history.replace({ pathname: '/sign-in', state: { from: window.location.href.replace('http://localhost:3000', '') } });
                    console.log("without login")
                    return;
                }
                if (response.status === 403) {
                    console.log("you do not joined this community")
                    return;
                }
                else if (response.status === 200)
                    return response.json()
            })
            .then(data => {
                console.log(data);
                if (data === undefined) {
                    console.log("POST like comment data is undefines")
                }
                // const postLikeBy = this.props.author;
                // if (this.state.likedBy === undefined) {
                //     this.setState({ likedBy: [postLikeBy] })
                // }
                // else {
                //     this.setState({ likedBy: [...this.state.likedBy, postLikeBy] })
                // }
            })
    }

    likeCommentGET() {

        var myHeaders = new Headers();
        if (!!localStorage.getItem("loginToken")) {
            myHeaders.append("Authorization", "Token " + localStorage.getItem('loginToken'));
        }

        var requestOptions =
        {
            method: 'GET',
            headers: myHeaders,
        };

        let url = 'http://localhost:8000/communities/' + this.props.communityID + '/posts/' + this.props.idPost + '/comments/' + this.props.commentId + '/likes';
        let url2 = "http://localhost:8000/communities/sega/posts/1/comments/5/likes";
        fetch(url, requestOptions)
            .then((response) => {

                //console.log('response get comment like', response.status);

                if (response.status === 401) {
                    //window.location.href("http://localhost:3000/sign-in")
                    //this.props.history.replace({ pathname: '/sign-in', state: { from: window.location.href.replace('http://localhost:3000', '') } })  
                    console.log("without login")
                    return;
                }

                if (response.status === 200)
                    return response.json()
            })
            .then((data) => {
                //console.log("data: ", data[0])
                data.map(d => {
                    if (d.likes_count === 0)
                        this.setState({ checkCountOfLiked: false })
                    else
                        this.setState({ countOfLiked: d.likes_count })
                })

                //this.setState({countOfLiked:data[0]})
                // for(var key in data[0])
                //     switch (key){
                //         case "likes_count":
                //             this.setState({countOfLiked:data[key]})
                //             console.log("count of",this.state.countOfLiked)
                //             break;
                //         default:
                //             break;
                //    }

                if (data[0] === undefined) {
                    console.log("GET data is undefine");
                    this.setState({ checkCountOfLiked: false })
                }
                else {
                    data.map((d) => {
                        this.setState({ likedBy: d.Liked_By.map(u => u.username) })
                    })

                    this.state.likedBy.forEach((l) => {
                        if (l == this.state.user) {
                            this.setState({ checkLike: false })
                        }
                    })
                }
            })
    }
}

export default CommentBox;
