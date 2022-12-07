document.querySelector('.buttonLogin').addEventListener('click', () => window.location.href = '../login/login.html')
document.querySelector('.buttonPersonalPosts').addEventListener('click', () => window.location.href = '../userPosts/userPosts.html')
document.querySelector('.buttonAutors').addEventListener('click', () => window.location.href = '../autors/autors.html')
document.querySelector('.buttonMainPage').addEventListener('click', () => window.location.href = '../index/index.html')

document.querySelector('.buttonPublic').addEventListener('click', publicPost)

inSessiontoLocal()

class newPost {
    constructor(title, text) {
        this.title = title
        this.text = text
        this.dateOnPost = (new Date()).toISOString().slice(0, 10)
        this.countOfComments = 0
        this.countOfLikes = 0
        let currentUser = JSON.parse(sessionStorage.getItem('currentUser'))
        this.name = currentUser.name
        this.surname = currentUser.surname
        this.id = currentUser.id
    }
}

function publicPost() {
    let title = document.querySelector('#titleR').value
    let text = document.querySelector('#textR').value
    let newPostObj = new newPost(title, text)
    let usersPosts = JSON.parse(localStorage.getItem('usersPosts'))
    usersPosts.push(newPostObj)
    console.log(usersPosts)
    if (title.length < 1 || text.length < 1) {
        return alert("Введите данные для публикации!")
    }
    localStorage.setItem('usersPosts', JSON.stringify(usersPosts))
    inLocaltoSession()
    alert('Ваш пост опубликован!')
}

function inLocaltoSession() {
    if (localStorage.getItem('users')) {
        let a = JSON.parse(localStorage.getItem('users'))
        sessionStorage.setItem('users', JSON.stringify(a))
    }

    // if (localStorage.getItem('currentPosts')) {
    //     let b = JSON.parse(localStorage.getItem('currentPosts'))
    //     sessionStorage.setItem('currentPosts', JSON.stringify(b))
    // }

    if (localStorage.getItem('usersPosts')) {
        let b = JSON.parse(localStorage.getItem('usersPosts'))
        sessionStorage.setItem('usersPosts', JSON.stringify(b))
    }

    if (localStorage.getItem('currentUser')) {
        let c = JSON.parse(localStorage.getItem('currentUser'))
        sessionStorage.setItem('currentUser', JSON.stringify(c))
    }
}

document.querySelector('.buttonLogout').addEventListener('click', logout)

function logout() {
    sessionStorage.removeItem('currentUser')
    window.location.replace('../index/index.html')
}

if (sessionStorage.getItem('currentUser')) {
    document.querySelector('.buttonLogout').classList.remove('hide')
    document.querySelector('.buttonLogin').classList.add('hide')
}

function inSessiontoLocal() {
    if (sessionStorage.getItem('users')) {
        let a = JSON.parse(sessionStorage.getItem('users'))
        localStorage.setItem('users', JSON.stringify(a))
    }

    // if (sessionStorage.getItem('currentUser')) {
    //     let c = JSON.parse(sessionStorage.getItem('currentUser'))
    //     localStorage.setItem('currentUser', JSON.stringify(c))
    // }

    if (sessionStorage.getItem('usersPosts')) {
        let b = JSON.parse(sessionStorage.getItem('usersPosts'))
        localStorage.setItem('usersPosts', JSON.stringify(b))
    }

    if (sessionStorage.getItem('currentPosts')) {
        let b = JSON.parse(sessionStorage.getItem('currentPosts'))
        localStorage.setItem('currentPosts', JSON.stringify(b))
    }
}