function getThreads(category: string) {
    return fetch(`https://ringworm-forum-0c0291e817b7.herokuapp.com/threads/${category}`)
}

function getSingleThread(category: string | undefined, id: string | undefined) {
    return fetch(`https://ringworm-forum-0c0291e817b7.herokuapp.com/threads/${category}/${id}`)
}

function postThread(thread: any) {
    return fetch("https://ringworm-forum-0c0291e817b7.herokuapp.com/threads/create",{
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
         },
        body: JSON.stringify(thread)
    })
}

function postPost(post: any, id: string | undefined) {
    return fetch(`https://ringworm-forum-0c0291e817b7.herokuapp.com/posts/create/${id}`,{
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
         },
        body: JSON.stringify(post)
    })
}

function deleteThread(id: number | null) {
    return fetch(`https://ringworm-forum-0c0291e817b7.herokuapp.com/threads/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

function deletePost(id: string | null) {
    return fetch(`https://ringworm-forum-0c0291e817b7.herokuapp.com/posts/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    })
}


export { getThreads, postThread, deleteThread, getSingleThread, postPost, deletePost }