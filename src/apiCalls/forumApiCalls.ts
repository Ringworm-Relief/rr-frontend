function getThreads(category: string) {
    return fetch(`https://ringworm-forum-0c0291e817b7.herokuapp.com/threads/${category}`)
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

export { getThreads, postThread }