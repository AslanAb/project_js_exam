inSessiontoLocal()

document.querySelector('.loginButton').addEventListener('click', login)
document.querySelector('.buttonLogin').addEventListener('click', () => window.location.reload())
document.querySelector('.buttonPersonalPosts').addEventListener('click', () => window.location.href = '../userPosts/userPosts.html')
document.querySelector('.buttonAutors').addEventListener('click', () => window.location.href = '../autors/autors.html')
document.querySelector('.buttonMainPage').addEventListener('click', () => window.location.href = '../index/index.html')
document.querySelector('.registrationButton').addEventListener('click', () => window.location.href = '../registration/registration.html')

function login() {
    let checkUserInArr = JSON.parse(localStorage.getItem('users'))
    let id = document.querySelector('#id').value
    let password = document.querySelector('#password').value
    let checkSimilarId = JSON.parse(localStorage.getItem('users')).filter(user => user.id == id)
    if (checkUserInArr.length > 0) {
        for (let i = 0; i <= checkUserInArr.length - 1; i++) {
            if (id === checkUserInArr[i].id && password === checkUserInArr[i].password) {
                sessionStorage.setItem('currentUser', JSON.stringify(checkUserInArr[i]))
                // localStorage.setItem('currentUser', JSON.stringify(checkUserInArr[i]))
                // inLocaltoSession()
                window.location.replace('../index/index.html')
                return
            } else if (id === checkUserInArr[i].id && password !== checkUserInArr[i].password) {
                alert('Неверный пароль!')
                return
            } else if (checkSimilarId < 1) {
                alert('Вы не зарегистрированы!')
                return
            }
        }
    } else {
        alert('Вы не зарегистрированы!')
    }
}

function inSessiontoLocal() {
    if (sessionStorage.getItem('users')) {
        let a = JSON.parse(sessionStorage.getItem('users'))
        localStorage.setItem('users', JSON.stringify(a))
    }

    if (sessionStorage.getItem('currentUser')) {
        let c = JSON.parse(sessionStorage.getItem('currentUser'))
        localStorage.setItem('currentUser', JSON.stringify(c))
    }

    if (sessionStorage.getItem('usersPosts')) {
        let b = JSON.parse(sessionStorage.getItem('usersPosts'))
        localStorage.setItem('usersPosts', JSON.stringify(b))
    }

    if (sessionStorage.getItem('currentPosts')) {
        let b = JSON.parse(sessionStorage.getItem('currentPosts'))
        localStorage.setItem('currentPosts', JSON.stringify(b))
    }
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
    localStorage.removeItem('currentUser')
    sessionStorage.removeItem('currentUser')
    window.location.replace('../index/index.html')
}

if (localStorage.getItem('currentUser')) {
    document.querySelector('.buttonLogout').classList.remove('hide')
    document.querySelector('.buttonLogin').classList.add('hide')
}
