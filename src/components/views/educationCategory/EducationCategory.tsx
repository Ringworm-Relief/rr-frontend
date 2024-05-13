import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getArticlesCategory } from "../../../apiCalls/articlesApiCalls";

function EducationCategory() {
    let { category } = useParams()
    const [articles, setArticles] = useState<any>({})

    useEffect(() => {
        getArticlesCategory()
        .then(data => {
            // let categoryData = data.filter(item => {
            //     return item.type === category
            // })
            console.log(data)
            setArticles(data.data)
        })
    }, [])

    return (
        <div>
            <p>{articles.attributes.title}</p>
            <h1>{category}</h1>
        </div>
    )
}

export default EducationCategory