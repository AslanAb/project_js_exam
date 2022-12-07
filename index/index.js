inSessiontoLocal()
creatEmptyObj()
currentPosts()

document.querySelector('.buttonLogin').addEventListener('click', () => window.location.href = '../login/login.html')
document.querySelector('.buttonMainPage').addEventListener('click', () => window.location.reload())
document.querySelector('.buttonPersonalPosts').addEventListener('click', () => {
    if (sessionStorage.getItem('currentUser')) {
        window.location.href = '../userPosts/userPosts.html'
    } else {
        alert("Необходимо зарегистрироваться")
    }
})
document.querySelector('.buttonAutors').addEventListener('click', () => {
    if (sessionStorage.getItem('currentUser')) {
        window.location.href = '../autors/autors.html'
    } else {
        alert("Необходимо зарегистрироваться")
    }
})
document.querySelector('.sort').addEventListener('click', sort)

if (sessionStorage.getItem('currentUser')) {
    document.querySelector('.portfileCard').classList.remove('hide')
    document.querySelector('.nutUserInP').classList.add('hide')
    let currentUser = JSON.parse(sessionStorage.getItem('currentUser'))
    document.querySelector('.idP').textContent = `${currentUser.id}`
    document.querySelector('.nameSurnameP').textContent = `${currentUser.name} ${currentUser.surname}`
}

function currentPosts() {
    let a = JSON.parse(localStorage.getItem('usersPosts'))
    localStorage.setItem('currentPosts', JSON.stringify(a))
    getCurrentPosts('currentPosts')
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

function sortByDateUp() {
    let currentPosts = JSON.parse(localStorage.getItem('currentPosts'))
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

    localStorage.setItem('currentPosts', JSON.stringify(currentPosts))
    getCurrentPosts('currentPosts')
}

function sortByDateDown() {
    let currentPosts = JSON.parse(localStorage.getItem('currentPosts'))
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

    localStorage.setItem('currentPosts', JSON.stringify(currentPosts))
    getCurrentPosts('currentPosts')
}

if (JSON.parse(localStorage.getItem('currentPosts')).length > 0) {
    document.querySelector('.idSearch').oninput = function () {
        let value = this.value.trim()
        let id = document.querySelectorAll('.post .id')
        search(value, id)
    }

    document.querySelector('.autorSearch').oninput = function () {
        let value = this.value.trim()
        let autors = document.querySelectorAll('.post .autorSpan')
        search(value, autors)
    }

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

function creatEmptyObj() {
    if (!localStorage.getItem('users')) {
        localStorage.setItem('users', JSON.stringify([]))
    }
    if (!localStorage.getItem('currentPosts')) {
        localStorage.setItem('currentPosts', JSON.stringify([]))
    }
    if (!localStorage.getItem('usersPosts')) {
        localStorage.setItem('usersPosts', JSON.stringify([]))
    }
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

document.querySelector('.buttonChangePortfileData').addEventListener('click', ChangeUserData)

function ChangeUserData() {
    document.querySelector('.changeInputDiv').classList.remove('hide')
    document.querySelector('.buttonChange').onclick = changeData
}

function changeData() {
    let users = JSON.parse(localStorage.getItem('users'))
    let currentUser = JSON.parse(sessionStorage.getItem('currentUser'))
    let index

    for (let i = 0; i < users.length; i++) {
        if (users[i].id == currentUser.id) {
            index = i
        }
    }
    let idChangeInput = document.querySelector('.idChangeInput').value
    let nameChangeInput = document.querySelector('.nameChangeInput').value
    let surnameChangeInput = document.querySelector('.surnameChangeInput').value
    let emailChangeInput = document.querySelector('.emailChangeInput').value

    if (idChangeInput.length > 0) {
        currentUser.id = idChangeInput
    }
    if (nameChangeInput.length > 0) {
        currentUser.name = nameChangeInput
    }
    if (surnameChangeInput.length > 0) {
        currentUser.surname = surnameChangeInput
    }
    if (emailChangeInput.length > 0) {
        currentUser.email = emailChangeInput
    }
    users[index] = currentUser
    localStorage.setItem('users', JSON.stringify(users))
    sessionStorage.setItem('currentUser', JSON.stringify(currentUser))
    currentPosts()
    inLocaltoSession()
    window.location.reload()
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

document.querySelector('.buttonLogout').addEventListener('click', logout)

function logout() {
    sessionStorage.removeItem('currentUser')
    window.location.replace('../index/index.html')
}

if (sessionStorage.getItem('currentUser')) {
    document.querySelector('.buttonLogout').classList.remove('hide')
    document.querySelector('.buttonLogin').classList.add('hide')
}