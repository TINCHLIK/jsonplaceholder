import React,  { useState, useEffect } from 'react';
import './Users.scss'
import Pagination from '../../common/Pagination'
import { paginate } from '../../../utils/paginate';
import  axios  from 'axios';
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
import Loading from '../../loader/Loading';
import {useNavigate } from 'react-router-dom';

const avatars=[avatar_1, avatar_2, avatar_3, avatar_4, avatar_5, avatar_6, avatar_7, avatar_8, avatar_9, avatar_10];
const count = 10;
const pageSize =5;

const Users = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [users, setUsers] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const navigate =useNavigate();

    useEffect(() => {
        axios({
            url:'https://jsonplaceholder.typicode.com/users',
            method:'GET'
        })
        .then((res)=>{setUsers(res.data)
            setLoading(false)
        })
        .catch((err)=>{
            setError(true)
            setLoading(false)
        })
    }, []);

    const handlePageChange = (page) =>{
        setCurrentPage(page)
    }
    
    const handlePost = (userId)=>{
        navigate(`/list_post/${userId}`)
    }
    
    const paginated = paginate(users, currentPage, pageSize);

    return (
        <div className="table">
            <>
            {error&&(<p className="text-uppercase fw-bold font-monospace fs-1 text-danger h-100">ERROR</p>)}
            {
               loading 
               ?(<Loading/> ) 
               :(
                   
                    <div> 
                        {error ? (null) :
                            <>
                                <table className="w-100 table table-dark table-hover">
                                    <thead>
                                        <tr>
                                            <th>Id</th>
                                            <th>Avatar</th>
                                            <th>Name</th>
                                            <th>User name</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {paginated.map((post)=>(
                                            <tr key={post.id} onClick={()=>handlePost(post.id)}>
                                                <td>{post.id}</td>
                                                <td>{<img className="avatar" src={avatars[post.id-1]}/> } </td>
                                                <td>{post.name}</td>
                                                <td>{post.username}</td>
                                            </tr>
                                        ))
                                        }
                                    </tbody>
                                </table>
                    
                                <Pagination 
                                    className="my_pagination"
                                    countItems={count} 
                                    pageSize={pageSize} 
                                    onPageChange={handlePageChange}
                                    currentPage={currentPage}
                                />
                            </> }   
                    </div>
                )
            }
            </>
        </div>
    );
};

export default Users;