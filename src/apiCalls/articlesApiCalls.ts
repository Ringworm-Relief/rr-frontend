import { Article } from "../utils/interfaces"

export const getArticlesCategory = () => {
    return fetch(`https://rr-educational-articles-efb008e252bf.herokuapp.com/api/v1/educational_articles`)
    .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error("Failed to fetch articles.");
        }
    })
}

export const postSavedArticle = (id: number | string, article: Article) => {
    return fetch(`https://rr-users-calendars-service-3e13398e3ea5.herokuapp.com/api/v1/users/${id}/saved_articles`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `${localStorage.getItem('token')}` 
          },
          body: JSON.stringify(article)
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error("Failed to fetch articles.");
        }
    })
}
