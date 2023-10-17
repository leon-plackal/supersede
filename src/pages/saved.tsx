import React from "react";
import BaseLayout from "../components/BaseLayout";


export default function SavedPostsPage(){
    return(
       <BaseLayout hideNav={false}>
           <h1 className='text-3xl font-semibold mb-4 text-lTextPrimary dark:text-dTextPrimary'>Saved Posts</h1>

       </BaseLayout>
    )
}