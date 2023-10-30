export function GET_REQUEST(url){
    return fetch(url, { method: 'GET' })
        .then(res => res.json())
}

export function DELETE_REQUEST(url, body){
    return fetch(url, {
        method: 'DELETE',
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json',
        },})
    //})
}

export function POST_REQUEST(url, body){
    return fetch(url, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json',
        },})
    //})
}