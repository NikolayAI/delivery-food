'use strict'

const cartButton = document.querySelector('#cart-button')
const modal = document.querySelector('.modal')
const close = document.querySelector('.close')
const buttonAuth = document.querySelector('.button-auth')
const modalAuth = document.querySelector('.modal-auth')
const closeAuth = document.querySelector('.close-auth')
const logInForm = document.querySelector('#logInForm')
const logInInput = document.querySelector('#login')
const userName = document.querySelector('.user-name')
const buttonOut = document.querySelector('.button-out')
const cardsRestaurants = document.querySelector('.cards-restaurants')
const containerPromo = document.querySelector('.container-promo')
const restaurants = document.querySelector('.restaurants')
const menu = document.querySelector('.menu')
const logo = document.querySelector('.logo')
const cardsMenu = document.querySelector('.cards-menu')

let login = localStorage.getItem('deliveryFoodLogin')

const validName = (str) => {
    const regName = /^[a-zA-Z0-9-_\.]{1,20}$/
    return regName.test(str)
}
const toggleModalAuth = () => {
    modalAuth.classList.toggle('is-open')
    logInInput.style.borderColor = ''
    if (modalAuth.classList.contains('is-open')) {
        disableScroll()
    } else {
        enableScroll()
    }
}
const toggleModal = () => modal.classList.toggle('is-open')
const authorized = () => {

    const logOut = () => {
        login = null
        localStorage.removeItem('deliveryFoodLogin')
        buttonAuth.style.display = ''
        userName.style.display = ''
        buttonOut.style.display = ''
        buttonOut.removeEventListener('click', logOut)
        checkAuth()
    }

    userName.textContent = login
    buttonAuth.style.display = 'none'
    userName.style.display = 'inline'
    buttonOut.style.display = 'block'
    buttonOut.addEventListener('click', logOut)
}
const notAuthorized = () => {

    const logIn = (event) => {
        event.preventDefault()
        if (validName(logInInput.value)) {
            login = logInInput.value
            localStorage.setItem('deliveryFoodLogin', login)
            toggleModalAuth()

            buttonAuth.removeEventListener('click', toggleModalAuth)
            closeAuth.removeEventListener('click', toggleModalAuth)
            logInForm.removeEventListener('submit', logIn)
            logInForm.reset()
            checkAuth()
        } else {
            logInInput.style.borderColor = '#ff0000'
            logInInput.value = ''
        }
    }

    buttonAuth.addEventListener('click', toggleModalAuth)
    closeAuth.addEventListener('click', toggleModalAuth)
    logInForm.addEventListener('submit', logIn)
    modalAuth.addEventListener('click', (event) => {
        if (event.target.classList.contains('is-open')) {
            toggleModalAuth()
        }
    })
}
const checkAuth = () => login ? authorized() : notAuthorized()
const disableScroll = () => {

    const widthScroll = window.innerWidth - document.body.offsetWidth

    document.body.dbScrollY = window.scrollY

    document.body.style.cssText = `
        position: fixed;
        top: ${-window.scrollY}px;
        left: 0;
        width: 100%;
        overflow: hidden;
        height: 100vh;
        padding-right: ${widthScroll}px;
    `
}
const enableScroll = () => {
    document.body.style.cssText = ``
    window.scroll({top: document.body.dbScrollY})
}
const createCardRestaurant = () => {
    const card = `
        <a class="card card-restaurant">
                    <img src="img/pizza-plus/preview.jpg" alt="image" class="card-image"/>
                    <div class="card-text">
                        <div class="card-heading">
                            <h3 class="card-title">Пицца плюс</h3>
                            <span class="card-tag tag">50 мин</span>
                        </div>
                        <div class="card-info">
                            <div class="rating">
                                4.5
                            </div>
                            <div class="price">От 900 ₽</div>
                            <div class="category">Пицца</div>
                        </div>
                    </div>
                </a>
    `
    cardsRestaurants.insertAdjacentHTML('beforeend', card)
}
const createCardGood = () => {
    const card = document.createElement('div')
    card.className = 'card'
    card.insertAdjacentHTML('beforeend', `
        <img src="img/pizza-plus/pizza-hawaiian.jpg" alt="image" class="card-image"/>
        <div class="card-text">
            <div class="card-heading">
                <h3 class="card-title card-title-reg">Пицца Гавайская</h3>
            </div>
            <div class="card-info">
                <div class="ingredients">Соус томатный, сыр «Моцарелла», ветчина, ананасы</div>
            </div>
            <div class="card-buttons">
                <button class="button button-primary button-add-cart">
                    <span class="button-card-text">В корзину</span>
                    <span class="button-cart-svg"></span>
                </button>
                <strong class="card-price-bold">440 ₽</strong>
            </div>
        </div>
    `)

    cardsMenu.insertAdjacentHTML('beforeend', card)
}
const openGoods = (event) => {
    const target = event.target
    if (login) {
        const restaurant = target.closest('.card-restaurant')
        if (restaurant) {
            cardsMenu.textContent = ''
            containerPromo.classList.add('hide')
            restaurants.classList.add('hide')
            menu.classList.remove('hide')

            createCardGood()
            createCardGood()
            createCardGood()
        }
    } else {
        toggleModalAuth()
    }
}

cartButton.addEventListener('click', toggleModal)
close.addEventListener('click', toggleModal)
cardsRestaurants.addEventListener('click', openGoods)
logo.addEventListener('click', () => {
    containerPromo.classList.remove('hide')
    restaurants.classList.remove('hide')
    menu.classList.add('hide')
})

checkAuth()
createCardRestaurant()
createCardRestaurant()
createCardRestaurant()
createCardRestaurant()

// Slider

console.log(new Swiper('.swiper-container', {
    slidePerView: 1,
    loop: true,
    autoplay: {delay: 2000},
    effect: 'flip',
    grabCursor: true,
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    }
}))