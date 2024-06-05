export const getArticlesCategory = () => {
    return fetch(`http://localhost:3000/api/v1/educational_articles`)
    .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error("Failed to fetch articles.");
        }
    })
}
