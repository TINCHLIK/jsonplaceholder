import axios from 'axios';
import React from 'react';
import { useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import "./Comment.scss";


const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const EMAIL = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

const Comment = () => {
    
    const [name,setName] = useState('')
    const [email,setEmail] = useState('')
    const [body,setBody] = useState('')
    const navigate = useNavigate()
    const handleSubmit=(e)=>{
        e.preventDefault()
        const v1 = USER_REGEX.test(name);
        const v2 = EMAIL.test(email);
        const v3 = body;
        if(!v1||!v2||!v3){
            alert("Iltimos formani to'liq to'g'ri to'ldiring")
        }
        axios({
            url:'https://jsonplaceholder.typicode.com/users',
            method:'POST',
            data:{name,email,body}
        })
        .then((res)=>{
            // bu yerda serverga ma'lumot yuboriladi
            console.log(res.status);
            navigate("/users")
        })
        .catch((err)=>{
            console.log(err);
        })
    }
    return (
        <form className="comment_container">
          
            <div className="form_item">
                <label htmlFor="email" className="form-label">Name</label>
                <input type="text" value={name} onChange={e=>setName(e.target.value)} className="form-control" id="email" placeholder=''/>
            </div>
            <div className="form_item">
                <label htmlFor="email" className="form-label">Email address</label>
                <input type="email" value={email} onChange={e=>setEmail(e.target.value)} className="form-control" id="email" placeholder="name@example.com"/>
            </div>
            <div className="form_item">
                <label htmlFor="exampleFormControlTextarea1" className="form-label">For your message</label>
                <textarea value={body} onChange={e=>setBody(e.target.value)} className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
            </div>
            <div className="form_item mt-3"> 
                <button onClick={handleSubmit} className="form-control" >Submit</button>
            </div>
        </form>
    );
};

export default Comment;
