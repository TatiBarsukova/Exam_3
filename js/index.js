//header fixed
window.onscroll = function scroll() {

    const header = document.querySelector('.header');
    const scrollOffcet = window.scrollY;

    if (scrollOffcet > 200) {
        header.classList.add('fixed');
    } else if (scrollOffcet <= 100) {
        header.classList.remove('fixed');

    };
};

// menu burger
const btn = document.querySelector('.nav_toggle');
const headerMenu = document.querySelector('.header');
let menu = document.querySelector('.menu');
let isMenuExpanded = true;

btn.onclick = () => {
    headerMenu.classList.toggle('active')
    menu.classList.toggle('active');
    btn.classList.toggle('active');
    scroll();
};


//menu link active
let menuAll = document.querySelector('.menu');
let menuLink = document.querySelectorAll('.menu__link');

menuLink.forEach(el => {
    el.addEventListener('click', function () {
        menuAll.querySelector('.active').classList.remove('active');

        el.classList.add('active');
    });
});



//modal window sign in
let buttonBox = document.querySelector(".button__box");

buttonBox.addEventListener('click', function () {
    let idModal = this.getAttribute('data-modal-id');
    openModal(idModal);
})

function openModal(id_modal) {
    let modalWindow = document.querySelector(id_modal);

    if (modalWindow.classList.contains("active")) {
        modalWindow.classList.remove('active')
    }
    else {
        modalWindow.classList.add('active');
    }

    let modalClose = modalWindow.querySelector('.modal__close');

    modalClose.addEventListener('click', function () {
        modalWindow.classList.remove('active');
    })

    let closeBack = modalWindow.querySelector('.close__back');

    closeBack.addEventListener('click', function () {
        modalWindow.classList.remove('active');
    })
}

//modal form

const emailModal = document.forms['form']['email'];
const passwordModal = document.forms['form']['password'];
const emailErrorModal = document.getElementById('modal_error_email');
const passErrorModal = document.getElementById('modal_error_password');


emailModal.addEventListener('textInput', email_Verify);
passwordModal.addEventListener('textInput', pass_Verify);

function validated() {
    if (emailModal.value.length < 9) {
        emailModal.style.border = "1px solid red";
        emailErrorModal.style.display = "block";
        emailModal.focus();
        return false;
    }
    if (passwordModal.value.length < 6) {
        passwordModal.style.border = "1px solid red";
        passErrorModal.style.display = "block";
        passwordModal.focus();
        return false;
    }

}
function email_Verify() {
    if (emailModal.value.length >= 8) {
        emailModal.style.border = "1px solid silver";
        emailErrorModal.style.display = "none";
        return true;
    }
}
function pass_Verify() {
    if (passwordModal.value.length >= 5) {
        passwordModal.style.border = "1px solid silver";
        passErrorModal.style.display = "none";
        return true;
    }
}


//плавный скролл
const anchors = document.querySelectorAll('a[href*="#"');

for (let anchor of anchors) {
    anchor.addEventListener("click", function (event) {
        event.preventDefault();
        const blockID = anchor.getAttribute('href');
        document.querySelector('' + blockID).scrollIntoView({
            behavior: "smooth",
            block: "start",
        }
        )
    })
};

//tab

function openTab(evt, idName) {
    let i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("slider__container");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("slider__link");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(idName).style.display = "block";
    evt.currentTarget.className += " active";
}



// carousel

let position = 0;
let carouselToShow = 3;
const carouselToScroll = 1;
const container = document.querySelector('.carousel__container');
const track = document.querySelector('.carousel__track');
const item = document.querySelector('.carousel__item');
const btnPrev = document.querySelector('.btn__prev');
const btnNext = document.querySelector('.btn__next');
const items = document.querySelectorAll('.carousel__item');
const itemsCount = items.length;
let itemWidth = Math.floor(container.clientWidth / carouselToShow);
const offset = container.clientWidth - (itemWidth * carouselToShow);
const movePosition = carouselToScroll * itemWidth;
const itemMarginRight = 10;


window.addEventListener("resize", resizeThrottler, false);

let resizeTimeout;
function resizeThrottler() {
    if (resizeTimeout) {
        return;
    }
    resizeTimeout = setTimeout(() => {
        resizeCells();
        resizeTimeout = null;
    }, 100);
}

function resizeCells() {
    if (container.clientWidth <= 1024) {
        carouselToShow = 2;
    }

    itemWidth = Math.floor(container.clientWidth / carouselToShow);
    items.forEach((item) => {
        item.style.minWidth = `${itemWidth - (itemMarginRight + parseInt(offset > 0 ? offset : 0))}px`;
    });

    if (container.clientWidth <= 450) {
        carouselToShow = 1;
    }

    itemWidth = Math.floor(container.clientWidth / carouselToShow);
    items.forEach((item) => {
        item.style.minWidth = `${itemWidth - (itemMarginRight + parseInt(offset > 0 ? offset : 0))}px`;
    });
}

resizeCells();


btnNext.addEventListener('click', () => {
    const itemsLeft = itemsCount - (Math.abs(position) + carouselToShow * itemWidth) / itemWidth;
    position -= itemsLeft >= carouselToScroll ? movePosition : itemsLeft * itemWidth;

    setPosition();
    checkBtns();
}
);

btnPrev.addEventListener('click', () => {
    const itemsLeft = Math.abs(position) / itemWidth;
    position += itemsLeft >= carouselToScroll ? movePosition : itemsLeft * itemWidth;

    setPosition();
    checkBtns();
}
);

const setPosition = () => {
    track.style.transform = `translateX(${position}px)`;
};

const checkBtns = () => {
    btnPrev.disabled = position === 0;
    btnNext.disabled = position <= -(itemsCount - carouselToShow) * itemWidth;
};
checkBtns();


// questions onclick

const questionsMap = {
    't1': 'text1',
    't2': 'text2',
    't3': 'text3',
    't4': 'text4',
};

function showAnswer(event) {
    const id = event.target.id;
    if (!id) {
        return;
    }

    const element = document.getElementById(questionsMap[id]);
    const currentStyle = getComputedStyle(element);
    element.style.display = currentStyle.display === 'none' ? 'block' : 'none';
}

// pictureslider

let positionSlider = 0;
const sliderToShow = 1;
const sliderToScroll = 1;
const sliderContainer = document.querySelector('.testimonials__container');
const sliderTrack = document.querySelector('.pictureslider__track');
const sliderItem = document.querySelector('.pictureslider__item');
const buttonPrev = document.querySelector('.button__prev');
const buttonNext = document.querySelector('.button__next');
const sliderItems = document.querySelectorAll('.pictureslider__item');
const sliderItemsCount = sliderItems.length;
const sliderItemWidth = Math.floor(sliderContainer.clientWidth / sliderToShow);
const sliderMovePosition = sliderToScroll * sliderItemWidth;

sliderItems.forEach((sliderItem) => {
    sliderItem.style.minWidth = `${sliderItemWidth}px`;
}
)

const inittialContent = sliderContainer.innerHTML;

setInterval(() => {
    next();
}, 3500)

buttonNext.addEventListener('click', () => {
    next();
}
);

function next() {
    const sliderItemsLeft = sliderItemsCount - (Math.abs(positionSlider) + sliderToShow * sliderItemWidth) / sliderItemWidth;
    positionSlider -= sliderItemsLeft >= sliderToScroll ? sliderMovePosition : sliderItemsLeft * sliderItemWidth;

    setPositionSlider();
    checkBtnsSlider();
}

buttonPrev.addEventListener('click', () => {
    const sliderItemsLeft = Math.abs(positionSlider) / sliderItemWidth;
    positionSlider += sliderItemsLeft >= sliderToScroll ? sliderMovePosition : sliderItemsLeft * sliderItemWidth;

    setPositionSlider();
    checkBtnsSlider();
}
);

const setPositionSlider = () => {
    sliderTrack.style.transform = `translateX(${positionSlider}px)`;
    if (buttonNext.disabled) {
        buttonNext.disabled = false;
        positionSlider = 0;
        sliderTrack.style.transform = `translateX(0px)`;
        return;
    }
};

const checkBtnsSlider = () => {
    buttonPrev.disabled = positionSlider === 0;
    buttonNext.disabled = positionSlider <= -(sliderItemsCount - sliderToShow) * sliderItemWidth;
};
checkBtnsSlider();


// form

const errorLabel = document.getElementById('error_label');

const approvLabel = document.getElementById('approv_label');


function userEmailChanged() {
    errorLabel.style.display = "none"
    approvLabel.style.display = "none";

}

function buttonSubmitPressed() {
    const email = document.getElementById('email');
    if (!validateEmail(email.value)) {
        errorLabel.style.display = "inline"
        return;

    }
    email.value = '';
    approv_label.style.display = "inline";

}

function validateEmail(email) {
    if (isEmptyOrSpaces(email)) {
        return false;
    }
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

function isEmptyOrSpaces(str) {
    return str === null || str.match(/^ *$/) !== null;
}