import axios from 'axios';
import React, {useState, useEffect} from 'react';
import { Link, useParams } from 'react-router-dom';
import './Post.scss'
import avatar_1 from '../../../avatars/avataaars-1.png'
import avatar_2 from '../../../avatars/avataaars-2.png'
import avatar_3 from '../../../avatars/avataaars-3.png'
import avatar_4 from '../../../avatars/avataaars-4.png'
import avatar_5 from '../../../avatars/avataaars-5.png'
import avatar_6 from '../../../avatars/avataaars-6.png'
import avatar_7 from '../../../avatars/avataaars-7.png'
import avatar_8 from '../../../avatars/avataaars-8.png'
import avatar_9 from '../../../avatars/avataaars-9.png'
import avatar_10 from '../../../avatars/avataaars-10.png'

const avatars=[avatar_1, avatar_2, avatar_3, avatar_4, avatar_5, avatar_6, avatar_7, avatar_8, avatar_9, avatar_10];

const Post = () => {
    const {id} =useParams();
    console.log(id);
    const [post,setPost] = useState(0);
    const [comments,setComments] = useState(0);
    
    useEffect(()=>{
        axios({
            url:`https://jsonplaceholder.typicode.com/posts/${id}`,
            method:'GET'
        })
        .then((res)=>{
            setPost(res.data)
        }).catch(err=>console.log(err))
    },[id]);

    useEffect(()=>{
        axios({
            url:`https://jsonplaceholder.typicode.com/posts/${id}/comments`,
            method:'GET'
        })
        .then((res)=>{
            setComments(res.data)
            console.log(res.data);
        }).catch(err=>console.log(err))
    },[id]);

    return (
        <div className="single_post_container">
            {post && (
                <div className="single_post">
                    <img className="avatar" src={avatars[post.userId-1]}/> 
                    <h1>{post.title}</h1>
                    <p>{post.body}</p>
                </div>
            )}
            <div className="add_comment"><Link to="/comment">Add Comment</Link></div>
            <h1>Comments</h1>
            {comments && comments.map((comment,index)=>(
                <div className="single_post comments">
                    <b>{index+1}</b>
                    <h1>{comment.name}</h1>
                    <h3>{comment.email}</h3>
                    <p>{comment.body}</p>
                </div>
            ))}
        </div>
        
    );
};

export default Post;