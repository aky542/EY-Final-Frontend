import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    userList:[],
    loading:false,
    error:null
};

const userSlice = createSlice({
    name:'user', 
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(fetchUsers.pending,(state)=>{
            state.loading = true;
        })
        .addCase(fetchUsers.fulfilled,(state,data)=>{
            state.loading = false;
            state.userList = data.payload;
        })
        .addCase(fetchUsers.rejected, (state,data)=>{
            state.loading = false;
            state.error = data.error.message;
        })
    }
})

const fetchUsers = createAsyncThunk('users/getAll', async()=>{
    const response = await fetch('http://localhost:5500/user');
    const data = await response.json();
    return data;
})

export default userSlice.reducer;
export {fetchUsers};


