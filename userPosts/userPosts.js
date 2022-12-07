if (sessionStorage.getItem('currentUser')) {
    buttonPersonalPostsFn()
} else {
    window.location.href = '../index/index.html'
}
inSessiontoLocal()

document.querySelector('.buttonNewPost').addEventListener('click', () => window.location.href = '../new_post/new_post.html')
document.querySelector('.buttonLogin').addEventListener('click', () => window.location.href = '../login/login.html')
document.querySelector('.buttonPersonalPosts').addEventListener('click', () => window.location.reload())
document.querySelector('.buttonAutors').addEventListener('click', () => window.location.href = '../autors/autors.html')
document.querySelector('.buttonMainPage').addEventListener('click', () => window.location.href = '../index/index.html')
document.querySelector('.sort').addEventListener('click', sort)

document.querySelector('.portfileCard').classList.remove('hide')
document.querySelector('.nutUserInP').classList.add('hide')
let currentUser = JSON.parse(sessionStorage.getItem('currentUser'))
document.querySelector('.idP').textContent= `${currentUser.id}`
document.querySelector('.nameSurnameP').textContent= `${currentUser.name} ${currentUser.surname}`


function buttonPersonalPostsFn() {
    let i = []
    let a = JSON.parse(localStorage.getItem('usersPosts'))
    let b = JSON.parse(sessionStorage.getItem('currentUser'))
    a.forEach((el) => {
        if (el.id == b.id) {
            i.push(el)
        }
    })
    localStorage.setItem('currentUserPosts', JSON.stringify(i))
    return getCurrentPosts('currentUserPosts')
}

function getCurrentPosts(item) {
    let currentPosts = JSON.parse(localStorage.getItem(item))
    let post = document.querySelector('.mainMid')
    let postTemplate = document.querySelector('.postTemplate')
    let title = postTemplate.content.querySelector('h1')
    let text = postTemplate.content.querySelector('p')
    let countOfLikes = postTemplate.content.querySelector('.countOfLikes')
    let id = postTemplate.content.querySelector('.id')
    let autorNameAndSurname = postTemplate.content.querySelector('.autorSpan')
    let dateOnPost = postTemplate.content.querySelector('.dateOnPost')
    let countOfComments = postTemplate.content.querySelector('.countOfComments')
    let checker = postTemplate.content.querySelector('.checker')
    let label = postTemplate.content.querySelector('.label')
    let changeSpan = postTemplate.content.querySelector('.changeSpan')
    let lastBorder = postTemplate.content.querySelector('.lastBorder')

    post.textContent = ''

    if (currentPosts.length > 0) {
        for (let i = 0; i < currentPosts.length; i++) {
            title.textContent = `${currentPosts[i].title}`
            text.textContent = `${currentPosts[i].text}`
            countOfLikes.textContent = `(${currentPosts[i].countOfLikes})`
            id.textContent = `${currentPosts[i].id}`
            dateOnPost.textContent = `${currentPosts[i].dateOnPost}`
            countOfComments.textContent = `Комментарии (${currentPosts[i].countOfComments})`
            autorNameAndSurname.textContent = `${currentPosts[i].name} ${currentPosts[i].surname}`

            checker.id = `${i}`
            label.setAttribute('for', `${i}`)
            changeSpan.classList.add('hide')
            lastBorder.classList.add('hide')

            let clone = postTemplate.content.cloneNode(true)
            post.append(clone)
        }
    } else {
        title.textContent = `Здесь может быть Ваш пост`
        text.textContent = `Смотрите как красиво он расположится у всех на виду!
        Очень умный текст! Новый год близится, Вы уже закупили алкоголя?!`
        countOfLikes.textContent = `(999)`
        id.textContent = `admin`
        dateOnPost.textContent = `Уже новый Год!`
        countOfComments.textContent = `Комментарии (0)`
        autorNameAndSurname.textContent = `Ошо или Омар Хайям!`

        checker.id = `${1}`
        label.setAttribute('for', `${1}`)
        changeSpan.classList.add('hide')
        lastBorder.classList.add('hide')

        let clone = postTemplate.content.cloneNode(true)
        post.append(clone)
    }
}

function sort() {
    let sortByRating = document.querySelector('.select')
    let sortByDate = document.querySelector('.select1')
    if (sortByRating.value == 2) {
        sortByRatingUp()
    } 
    if (sortByRating.value == 3) {
        sortByRatingDown()
    }
    if (sortByDate.value == 2) {
        sortByDateUp()
    }
    if (sortByDate.value == 3) {
        sortByDateDown()
    }
}

function sortByRatingUp() {
    let currentPosts = JSON.parse(localStorage.getItem('currentUserPosts'))
    currentPosts.sort(function (a, b) {
        if (a.countOfLikes > b.countOfLikes) {
            return 1;
        }
        if (a.countOfLikes < b.countOfLikes) {
            return -1;
        }
        return 0;
    })
    localStorage.setItem('currentUserPosts', JSON.stringify(currentPosts))
    getCurrentPosts('currentUserPosts')
}

function sortByRatingDown() {
    let currentPosts = JSON.parse(localStorage.getItem('currentUserPosts'))
    currentPosts.sort(function (a, b) {
        if (a.countOfLikes > b.countOfLikes) {
            return -1;
        }
        if (a.countOfLikes < b.countOfLikes) {
            return 1;
        }
        return 0;
    })
    localStorage.setItem('currentUserPosts', JSON.stringify(currentPosts))
    getCurrentPosts('currentUserPosts')
}

function sortByDateUp() {
    let currentPosts = JSON.parse(localStorage.getItem('currentUserPosts'))
    for (let i = 0; i < currentPosts.length; i++) {
        let date = new Date(`${currentPosts[i].dateOnPost}`)
        date.setDate(date.getDate())
        currentPosts[i].dateOnPost = date
    }
    currentPosts.sort(function (a, b) {
        if (a.dateOnPost > b.dateOnPost) {
            return 1;
        }
        if (a.dateOnPost < b.dateOnPost) {
            return -1;
        }
        return 0;
    })

    for (let i = 0; i < currentPosts.length; i++) {
        currentPosts[i].dateOnPost = (currentPosts[i].dateOnPost).toISOString().slice(0, 10)
    }

    localStorage.setItem('currentUserPosts', JSON.stringify(currentPosts))
    getCurrentPosts('currentUserPosts')
}

function sortByDateDown() {
    let currentPosts = JSON.parse(localStorage.getItem('currentUserPosts'))
    for (let i = 0; i < currentPosts.length; i++) {
        let date = new Date(`${currentPosts[i].dateOnPost}`)
        date.setDate(date.getDate())
        currentPosts[i].dateOnPost = date
    }

    currentPosts.sort(function (a, b) {
        if (a.dateOnPost > b.dateOnPost) {
            return -1;
        }
        if (a.dateOnPost < b.dateOnPost) {
            return 1;
        }
        return 0;
    })

    for (let i = 0; i < currentPosts.length; i++) {
        currentPosts[i].dateOnPost = (currentPosts[i].dateOnPost).toISOString().slice(0, 10)
    }

    localStorage.setItem('currentUserPosts', JSON.stringify(currentPosts))
    getCurrentPosts('currentUserPosts')
}

if (JSON.parse(localStorage.getItem('currentUserPosts')).length > 0) {
    document.querySelector('.titleSpan').oninput = function () {
        let value = this.value.trim()
        let titles = document.querySelectorAll('.post .titleSearch')
        search(value, titles)
    }

    document.querySelector('.textSpan').oninput = function () {
        let value = this.value.trim()
        let textSearch = document.querySelectorAll('.post .textSearch')
        search(value, textSearch)
    }
}

function search(value, item) {
    if (value != '') {
        item.forEach(function (el) {
            if (el.innerText.toLowerCase().search(value) == -1) {
                el.closest('.post').classList.add('hide')
                el.innerHTML = el.innerText
            } else {
                el.closest('.post').classList.remove('hide')
                let str = el.innerText
                el.innerHTML = insertMark(str, el.innerText.toLowerCase().search(value), value.length)
            }
        })
    } else {
        item.forEach(function (el) {
            el.closest('.post').classList.remove('hide')
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