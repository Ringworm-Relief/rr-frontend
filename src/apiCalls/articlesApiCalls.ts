export const getArticlesCategory = () => {
  return fetch(
    `https://rr-educational-articles-efb008e252bf.herokuapp.com/api/v1/educational_articles`
  ).then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error("Failed to fetch articles.");
    }
  });
};
