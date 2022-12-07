document.querySelector('.buttonLogin').addEventListener('click', () => window.location.href = '../login/login.html')
document.querySelector('.buttonPersonalPosts').addEventListener('click', () => window.location.href = '../userPosts/userPosts.html')
document.querySelector('.buttonAutors').addEventListener('click', () => window.location.reload())
document.querySelector('.buttonMainPage').addEventListener('click', () => window.location.href = '../index/index.html')

document.querySelector('.portfileCard').classList.remove('hide')
document.querySelector('.nutUserInP').classList.add('hide')
let currentUser = JSON.parse(sessionStorage.getItem('currentUser'))
document.querySelector('.idP').textContent= `${currentUser.id}`
document.querySelector('.nameSurnameP').textContent= `${currentUser.name} ${currentUser.surname}`

document.querySelector('.sort').addEventListener('click', sort)

inSessiontoLocal()
setAutors()
getAutors()

function sortByRatingUp() {
    let currentPosts = JSON.parse(localStorage.getItem('currentPosts'))
    currentPosts.sort(function (a, b) {
        if (a.countOfLikes > b.countOfLikes) {
            return 1;
        }
        if (a.countOfLikes < b.countOfLikes) {
            return -1;
        }
        return 0;
    })
    localStorage.setItem('currentPosts', JSON.stringify(currentPosts))
    getCurrentPosts('currentPosts')
}

function sortByRatingDown() {
    let currentPosts = JSON.parse(localStorage.getItem('currentPosts'))
    currentPosts.sort(function (a, b) {
        if (a.countOfLikes > b.countOfLikes) {
            return -1;
        }
        if (a.countOfLikes < b.countOfLikes) {
            return 1;
        }
        return 0;
    })
    localStorage.setItem('currentPosts', JSON.stringify(currentPosts))
    getCurrentPosts('currentPosts')
}

function inLocaltoSession() {
    if (localStorage.getItem('users')) {
        let a = JSON.parse(localStorage.getItem('users'))
        sessionStorage.setItem('users', JSON.stringify(a))
    }

    // if (localStorage.getItem('currentUser')) {
    //     let c = JSON.parse(localStorage.getItem('currentUser'))
    //     sessionStorage.setItem('currentUser', JSON.stringify(c))
    // }

    if (localStorage.getItem('usersPosts')) {
        let b = JSON.parse(localStorage.getItem('usersPosts'))
        sessionStorage.setItem('usersPosts', JSON.stringify(b))
    }

    if (localStorage.getItem('currentPosts')) {
        let b = JSON.parse(localStorage.getItem('currentPosts'))
        sessionStorage.setItem('currentPosts', JSON.stringify(b))
    }
}

function getAutors() {
    let users = JSON.parse(localStorage.getItem('autors'))
    let mainDiv = document.querySelector('.mainMid')
    let autorsTemplate = document.querySelector('.autorsTemplate')
    let autorRating = autorsTemplate.content.querySelector('.autorRating')
    let autorName = autorsTemplate.content.querySelector('.autorName')
    let likeAutor = autorsTemplate.content.querySelector('.likeAutor')
    
    mainDiv.textContent = ''

    if (users.length > 0) {
        for (let i = 0; i < users.length; i++) {
            autorName.textContent = `${users[i].name} ${users[i].surname}`
            autorRating.textContent = `Рейтинг: ${users[i].rating.count}`
            likeAutor.textContent = `${users[i].id}`
            likeAutor.id = `${users[i].id}`
            let clone = autorsTemplate.content.cloneNode(true)
            mainDiv.append(clone)
            document.querySelector(`#${users[i].id}`).addEventListener('click', likeAutorFn)
        }
    } else {
        alert('Никто не зарегистрирован!')
    }
}

function likeAutorFn() {
    let users = JSON.parse(localStorage.getItem('users'))
    let currentUser = JSON.parse(sessionStorage.getItem('currentUser'))
    let autor
    let indexInUsers
    for (let i = 0; i < users.length; i++) {
        if (users[i].id == this.id) {
            autor = users[i]
            indexInUsers = i
        }
    }

    if (autor.rating.whoLiked.indexOf(currentUser.id) == -1) {
        autor.rating.count++
        autor.rating.whoLiked.push(currentUser.id)
    } else {
        autor.rating.count--
        for (let i = 0; i <= autor.rating.whoLiked.length - 1; i++) {
            if (autor.rating.whoLiked[i] == currentUser.id) {
                autor.rating.whoLiked.splice(i, 1)
            }
        }
    }
    users[indexInUsers] = autor
    localStorage.setItem('users', JSON.stringify(users))
    inLocaltoSession()
    setAutors()
    sort() 
    getAutors()
}

function setAutors() {
    let users = JSON.parse(localStorage.getItem('users'))
    localStorage.setItem('autors', JSON.stringify(users))
}

function sort() {
    let sortByRating = document.querySelector('.select')

    if (sortByRating.value == 2) {
        sortByRatingUp()
    } 
    if (sortByRating.value == 3) {
        sortByRatingDown()
    }
}

function sortByRatingUp() {
    let autors = JSON.parse(localStorage.getItem('autors'))
    autors.sort(function (a, b) {
        if (a.rating.count > b.rating.count) {
            return 1;
        }
        if (a.rating.count < b.rating.count) {
            return -1;
        }
        return 0;
    })
    localStorage.setItem('autors', JSON.stringify(autors))
    getAutors()
}

function sortByRatingDown() {
    let autors = JSON.parse(localStorage.getItem('autors'))
    autors.sort(function (a, b) {
        if (a.rating.count > b.rating.count) {
            return -1;
        }
        if (a.rating.count < b.rating.count) {
            return 1;
        }
        return 0;
    })
    localStorage.setItem('autors', JSON.stringify(autors))
    getAutors()
}

if (JSON.parse(localStorage.getItem('autors')).length > 0) {
    document.querySelector('.autorSearch').oninput = function () {
        let value = this.value.trim()
        let autors = document.querySelectorAll('.autorsDiv .autorName')
        search(value, autors)
    }
}

function search(value, item) {
    if (value != '') {
        item.forEach(function (el) {
            if (el.innerText.toLowerCase().search(value) == -1) {
                el.closest('.autorsDiv').classList.add('hide')
                el.innerHTML = el.innerText
            } else {
                el.closest('.autorsDiv').classList.remove('hide')
                let str = el.innerText
                el.innerHTML = insertMark(str, el.innerText.toLowerCase().search(value), value.length)
            }
        })
    } else {
        item.forEach(function (el) {
            el.closest('.autorsDiv').classList.remove('hide')
            el.innerHTML = el.innerText
        })
    }
}

function insertMark(string, pos, len) {
    return string.slice(0, pos) + '<mark>' + string.slice(pos, pos + len) + "</mark>" + string.slice(pos + len)
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