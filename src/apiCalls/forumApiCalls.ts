function getThreads(category: string) {
    return fetch(`https://ringworm-forum-0c0291e817b7.herokuapp.com/threads/${category}`)
}

export { getThreads }