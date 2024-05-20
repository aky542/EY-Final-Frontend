import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';


// Function to retrieve the JWT token from local storage
const getTokenFromStorage = () => localStorage.getItem('jwtToken');

// Define initial state
const initialState = {
    blogList: [],
    error: null,
    loading: false
};

// Async thunk for fetching blog posts
const fetchBlogs = createAsyncThunk('projects/getblogs', async () => {
    const response = await fetch(`http://localhost:5500/blog`);
    const blogData = await response.json();
    console.log(blogData); // Log the API response to check its structure
    
    return blogData.data;
});

// Async thunk for creating a new blog post
const createBlog = createAsyncThunk('blogs/createBlog', async (newBlog) => {
    const token = getTokenFromStorage(); // Retrieve the JWT token
    const response = await fetch('https://your-backend-api.com/blogs', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(newBlog)
    });
    if (!response.ok) {
        throw new Error('Failed to create blog');
    }
    return await response.json();
});

// Async thunk for updating a blog post
const updateBlog = createAsyncThunk('blogs/updateBlog', async (updateData) => {
    const token = getTokenFromStorage(); // Retrieve the JWT token
    const response = await fetch(`https://your-backend-api.com/blogs/${updateData.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(updateData)
    });
    if (!response.ok) {
        throw new Error('Failed to update blog');
    }
    return await response.json();
});

// Async thunk for deleting a blog post
const deleteBlog = createAsyncThunk('blogs/deleteBlog', async (id) => {
    const token = getTokenFromStorage(); // Retrieve the JWT token
    const response = await fetch(`https://your-backend-api.com/blogs/${id}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    if (!response.ok) {
        throw new Error('Failed to delete blog');
    }
    return id;
});

// Create the slice
const blogSlice = createSlice({
    name: 'blogs',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
          .addCase(fetchBlogs.pending, (state) => {
                state.loading = true;
            })
          .addCase(fetchBlogs.fulfilled, (state, action) => {
                state.loading = false;
                state.blogList = action.payload;
            })
          .addCase(fetchBlogs.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
          .addCase(createBlog.fulfilled, (state, action) => {
                state.blogList.push(action.payload);
            })
          .addCase(updateBlog.fulfilled, (state, action) => {
                const index = state.blogList.findIndex(blog => blog._id === action.payload._id);
                if (index!== -1) {
                    state.blogList[index] = action.payload;
                }
            })
          .addCase(deleteBlog.fulfilled, (state, action) => {
                state.blogList = state.blogList.filter(blog => blog._id!== action.payload);
            });
    }
});

export default blogSlice.reducer;
export { fetchBlogs, createBlog, updateBlog, deleteBlog };
