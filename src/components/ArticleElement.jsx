import React from "react";
import { useEffect, useState } from "react";

import {useSelector, useDispatch} from 'react-redux'
import { NewArticleForm } from "./NewArticleForm";

const ArticleElement = () => {

    const dispatch = useDispatch()

    useEffect(() => {

    })

    const [cantArticles, setCantArticles] = useState(1)

    return (
        <>
        
        <button>+</button>
        </>
    )
}

export default ArticleElement