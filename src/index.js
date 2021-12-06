// write your code here
const imageContainer = document.querySelector('.image-container')

const state = {
    images:[]
}

function getImages() {
    return fetch("http://localhost:3000/images")
    .then(function(resp) {
        return resp.json()
    })
}

function getComments() {
    return fetch("http://localhost:3000/comments")
    .then(function(resp) {
        return resp.json()
    })
}

function renderImages() {
    imageContainer.innerHTML = ''

    for(const image of state.images) {
        const articleEl = document.createElement('article')
        articleEl.setAttribute('class', 'image-card')

        const titleEl = document.createElement('h2')
        titleEl.setAttribute('class', 'title')
        titleEl.textContent = image.title

        const imageEl = document.createElement('img')
        imageEl.setAttribute('class', 'image')
        imageEl.setAttribute('src',`${image.image}`)

        const likesDivEl = document.createElement('div')
        likesDivEl.setAttribute('class', 'likes-section')

        const likesSpanEl = document.createElement('span')
        likesSpanEl.setAttribute('class', 'likes')
        likesSpanEl.textContent = `${image.likes} likes`

        const likeBtnEl = document.createElement('button')
        likeBtnEl.setAttribute('class', 'like-button')
        likeBtnEl.textContent = `♥`

        const comentsUlEl = document.createElement('ul')
        comentsUlEl.setAttribute('class', 'comments')

        
        for (const comment of image.comments) {
            const comentsLiEl = document.createElement('li')
            comentsLiEl.textContent = `${comment.content}`
            comentsUlEl.append(comentsLiEl)
        }
         
        likesDivEl.append(likesSpanEl, likeBtnEl)
        articleEl.append(titleEl, imageEl, likesDivEl, comentsUlEl)
        imageContainer.append(articleEl)
    }
}

function render(){
    renderImages()
}

getImages().then(function (imagesFromServer) {
    state.images = imagesFromServer
    render()
})

render()
