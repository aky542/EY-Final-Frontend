import { configureStore } from "@reduxjs/toolkit"
import Userslice from "./Userslice";
import Blogslice from "./Blogslice";




const store = configureStore({
    reducer:{
        user:Userslice,
        blogs:Blogslice
    }
})

export default store;