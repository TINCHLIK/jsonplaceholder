import React from 'react';
import './Main.scss'
import {Routes, Route} from 'react-router-dom'
import TableList from '../table/tableList/TableList'
import Post from '../table/post/Post';
import Users from '../table/users/Users';
import Comment from '../comment/Comment';
import AddPosts from '../add_post/AddPost';

const Main = () => {
    return (
        <div className="main">
            
        <Routes>
         <Route path="/users" element={<Users/>}/> 
         <Route path="/list_post/:userId" element={<TableList/>}/> 
         <Route path="/list_post/post/:id" element={<Post/>}/> 
         <Route path="/comment" element={<Comment/>}/> 
         <Route path="/add_post" element={<AddPosts/>}/> 
        </Routes>
        
        </div>
    );
};

export default Main;