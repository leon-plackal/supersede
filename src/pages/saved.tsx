import React from "react";
import BaseLayout from "../components/BaseLayout";
import PostCard from "../components/cards/PostCard";
import {Card} from "@mui/material";

export default function SavedPostsPage(){
    return(
       <BaseLayout hideNav={false}>
           <h1 className='text-3xl font-semibold mb-4 text-lTextPrimary dark:text-dTextPrimary'>Saved Posts</h1>
           <Card></Card>
       </BaseLayout>
    )
}