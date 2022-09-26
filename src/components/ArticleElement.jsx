import React from "react";
import { useEffect, useState } from "react";

import {useSelector, useDispatch} from 'react-redux'
import { NewArticleForm } from "./NewArticleForm";

const ArticleElement = () => {

    const dispatch = useDispatch()
    const my_products = useSelector(state => state.articles)

    useEffect(() => {

    })

    const [cantArticles, setCantArticles] = useState(1)

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