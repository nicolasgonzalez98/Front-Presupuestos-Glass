import React from "react";
import { useEffect } from "react";

import {useSelector} from 'react-redux'
import { NewArticleForm } from "./NewArticleForm";

const ArticleElement = () => {

    
    const my_products = useSelector(state => state.articles)

    

   

    return (
        <>
        <li>
            {
                my_products.length > 0 &&
                <>
                    {my_products?.map(e =>
                        <ul>{e.name}</ul>
                        )}
                </>
            }
        </li>
        <NewArticleForm />
        
        </>
    )
}

export default ArticleElement