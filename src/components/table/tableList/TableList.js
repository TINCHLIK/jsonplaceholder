import React,  { useState, useEffect } from 'react';
import './TableList.scss'
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
import {useNavigate, useParams } from 'react-router-dom';

const avatars=[avatar_1, avatar_2, avatar_3, avatar_4, avatar_5, avatar_6, avatar_7, avatar_8, avatar_9, avatar_10];
const count = 10;
const pageSize =5;

const TableList = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [posts, setPosts] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const navigate =useNavigate();

    const {userId} = useParams();
    useEffect(() => {
        axios({
            url:`https://jsonplaceholder.typicode.com/posts`,
            method:'GET'
        })
        .then((res)=>{
            setPosts(res.data.filter((item)=>item.userId==userId))
            setLoading(false)
        })
        .catch((err)=>{
            setError(true)
            setLoading(false)
            console.log("xato");
        })
    }, []);

    const handlePageChange = (page) =>{
        setCurrentPage(page)
    }
    
    const handlePost = (id)=>{
        navigate(`/list_post/post/${id}`)
    }
    
    const paginated = paginate(posts, currentPage, pageSize);

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
                                            <th>Title</th>
                                            <th>Message</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {paginated.map((post)=>(
                                            <tr key={post.id} onClick={()=>handlePost(post.id)}>
                                                <td>{post.id}</td>
                                                <td>{<img className="avatar" src={avatars[post.userId-1]}/> } </td>
                                                <td>{post.title}</td>
                                                <td>{post.body}</td>
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

export default TableList;