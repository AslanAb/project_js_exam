inSessiontoLocal()
creatEmptyObj()

document.querySelector('.submitRegistration').addEventListener('click', fnRegistraton)
document.querySelector('.buttonLogin').addEventListener('click', () => window.location.href = '../login/login.html')
document.querySelector('.buttonPersonalPosts').addEventListener('click', () => window.location.href = '../userPosts/userPosts.html')
document.querySelector('.buttonAutors').addEventListener('click', () => window.location.href = '../autors/autors.html')
document.querySelector('.buttonMainPage').addEventListener('click', () => window.location.href = '../index/index.html')

function fnRegistraton() {
    let id = document.querySelector('#idR').value
    let email = document.querySelector('#emailR').value
    let password = document.querySelector('#passwordR').value
    let name = document.querySelector('#nameR').value
    let surname = document.querySelector('#surnameR').value

    let newUser = new NewUser(
        id,
        name,
        surname,
        password,
        email,
    )
    let users = JSON.parse(localStorage.getItem('users'))
    if (users.length > 0) {
        let checkSimilarId = users.filter(user => user.id == newUser.id)
        if (checkData(newUser) && checkSimilarId.length < 1) {
            users.push(newUser)
            localStorage.setItem('users', JSON.stringify(users))
            inLocaltoSession()
            alert("Вы успешно зарегистрированы!")
            window.location.href = '../login/login.html'
        } else if (checkSimilarId.length > 0) {
            alert('Вы уже зарегистрированы')
        }
    } else {
        if (checkData(newUser)) {
            users.push(newUser)
            localStorage.setItem('users', JSON.stringify(users))
            inLocaltoSession()
            alert("Вы успешно зарегистрированы!")
            window.location.href = '../login/login.html'
        }
    }
}
class NewUser {
    constructor(id, name, surname, password, email) {
        this.id = id
        this.name = name
        this.surname = surname
        this.password = password
        this.email = email
        this.rating = {
            count: 0,
            whoLiked: []
        }
    }
}
const validateEmail = (email) => {
    return String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
}
function checkData(newUser) {
    let passwordCheck = /[A-Z]\S*/g
    if (!validateEmail(newUser.email)) {
        alert("Incorrect email!")
        return false;
    } else if (newUser.name.length < 1 || newUser.surname.length < 1
        || newUser.password.length < 1) {
        alert('Complete all data!')
        return false;
    } else if (!passwordCheck.test(newUser.password)) {
        alert('Incorrect password')
        return false;
    } else {
        return true
    }
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
