import { getArticlesCategory } from "../../../apiCalls/articlesApiCalls";
import { useState, useEffect } from "react";
import { EducationArticle, SavedArticlesProps } from "../../../utils/interfaces";
import EducationArtCard from "../../subComps/educationArtCard/EducationArtCard";
import { useNavigate } from "react-router-dom";
import { Typography, Box, Grid, Container, Button } from "@mui/material";

// const SavedArticles: React.FC<SavedArticlesProps> = ({ savedArticles, handleSaves }) => {
//     // const [saved, setSaved] = useState<string[]>(savedArticles)
//     const navigate = useNavigate();
//     const [allArticles, setAllArticles] = useState<EducationArticle[]>([])
    
//     const getSavedArticles = () => {
//         getArticlesCategory()
//         .then(data => {
//             setAllArticles(data.data)
//         })
//     }

//     const handleClick = (id: string | void) => {
//         navigate(`/education/category/${id}`); 
//     };

//     useEffect(() => {
//         getSavedArticles()
//     }, [])

//     const savedArticleCards = allArticles.map((article: EducationArticle) => {
//         if (savedArticles.includes(article.id)) {
//         return (
//         <EducationArtCard 
//         title={article.attributes.title}
//         tagline={article.attributes.tagline}
//         handleClick={handleClick}
//         handleSaves={handleSaves}
//         savedArticles={savedArticles}
//         id={article.id}
//         key={article.id}
//         isSaved={true}
//         />
//         )
//     }
// })

//     const noArticlesSaved = <div><Typography variant="h4">You dont have any articles saved</Typography><Button onClick={() => navigate('/education')}>Browse Articles</Button></div>

//     return (
//         <Container sx={{display: 'flex',
//         flexDirection: 'column', 
//         justifyContent: 'center', 
//         alignItems: 'center',
//         mb: "30px" 
//         }}>
//             <Typography sx={{my: "20px"}} variant="h2">Saved Articles</Typography>
//             <Box>
//             <Grid
//               container
//               justifyContent="center"
//               alignItems="center"
//               spacing={5}
//               columns={3}
//             >
//            {savedArticleCards.length ? savedArticleCards : noArticlesSaved}

//             </Grid>
//            </Box>
//         </Container>
//     )
// }

// export default SavedArticles

const SavedArticles: React.FC<SavedArticlesProps> = ({ savedArticles, handleSaves }) => {
    const navigate = useNavigate();
    const [allArticles, setAllArticles] = useState<EducationArticle[]>([])
    
    const getSavedArticles = () => {
        getArticlesCategory()
        .then(data => {
            setAllArticles(data.data)
        })
    }

    const handleClick = (id: string | void) => {
        navigate(`/education/category/${id}`); 
    };

    useEffect(() => {
        getSavedArticles()
    }, [])

    const savedArticleCards = allArticles.map((article: EducationArticle) => {
        if (savedArticles.includes(article.id)) {
            return (
                <EducationArtCard 
                    title={article.attributes.title}
                    tagline={article.attributes.tagline}
                    handleClick={handleClick}
                    handleSaves={handleSaves}
                    savedArticles={savedArticles}
                    id={article.id}
                    key={article.id}
                    isSaved={true}
                />
            )
        }
    })

    const noArticlesSaved = (
        <div>
            <Typography variant="h4">You don't have any articles saved</Typography>
            <Button onClick={() => navigate('/education')}>Browse Articles</Button>
        </div>
    );

    return (
        <Container sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', mb: "30px" }}>
            <Typography sx={{ my: "20px" }} variant="h2">Saved Articles</Typography>
            <Box>
                <Grid
                    container
                    justifyContent="center"
                    alignItems="center"
                    spacing={5}
                    sx={{ gridTemplateColumns: 'repeat(3, 1fr)' }} 
                >
                    {savedArticleCards.length ? savedArticleCards : noArticlesSaved} 
                </Grid>
            </Box>
        </Container>
    )
}

export default SavedArticles;

