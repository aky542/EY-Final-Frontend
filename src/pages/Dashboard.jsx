
import React, { useContext, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { AuthContext } from '../contexts/Authcontext';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBlogs } from '../redux/Blogslice'; 
import Blogcard from '../components/Blogcard';

const Dashboard = () => {
  const { isAuthenticated } = useContext(AuthContext);
  const dispatch = useDispatch();
  const blogs = useSelector(state => state.blogs.blogList);

  useEffect(() => {
    dispatch(fetchBlogs()); 
  }, [dispatch]); 
  console.log(isAuthenticated);

  return (
    <div>
      <Navbar isAuthenticated={isAuthenticated} />
      {blogs.length === 0? (
        <p>No projects to display</p>
      ) : (
        blogs.map((blog) => (
          <Blogcard key={blog._id} item={blog} /> // Removed unnecessary return statement
        ))
      )}
    </div>
  );
  
};

export default Dashboard;

