import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { getArticlesCategory } from "../../../apiCalls/articlesApiCalls";
import { EducationArticle } from "../../../utils/interfaces";
import { Typography, Box, Grid } from "@mui/material";
import EducationArtCard from "../../subComps/educationArtCard/EducationArtCard";


interface RouteParams {
    [key: string]: string | undefined;
  }

function EducationCategory() {
    let { category } = useParams<RouteParams>()
    const navigate = useNavigate();
    const [articles, setArticles] = useState<EducationArticle[]>([])

    const filterCategories = () => {
        getArticlesCategory()
        .then(data => {
            console.log("data", data)
            let categoryData = data.data.filter((item: EducationArticle) => {
                return item.type === category
            })
            console.log("category data:",categoryData)
            setArticles(categoryData)
        })

    }

    const handleClick = (id: string | void) => {
        navigate(`/education/${category}/${id}`); 
    };

    useEffect(() => {
        if (category) {
        filterCategories()
        }
    }, [category])

    const articleCards = articles.map((article: EducationArticle) => {
        return (
        <EducationArtCard 
        title={article.attributes.title}
        tagline={article.attributes.tagline}
        handleClick={handleClick}
        id={article.id}
        key={article.id}
        />
        )
    })

    const getTitle = (category: string | undefined) => {
        switch (category) {
            case "cleaning":
                return "All things cleaning";
            case "medical":
                return "Treatment Options";
            case "general":
                return "All Things Ringworm";
            default:
                return "Unknown Category";
        }
    }

  

   
   

    return (
        <div>
            <Typography variant="h2">{getTitle(category)}</Typography>
            <Box>
            <Grid
              container
              justifyContent="center"
              alignItems="center"
              spacing={5}
              columns={4}
            >
                {articleCards}
            </Grid>
           </Box>
{/* 
        <div>{articleCards}</div> */}
        
        </div>
    )

}

export default EducationCategory