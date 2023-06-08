const start = document.getElementById('start');
const sorry = document.querySelectorAll('.sorry');
const show = document.querySelectorAll('.showImg');
const showNext = document.querySelectorAll('.showNextImg');
const goFinish = document.querySelectorAll('.showLastImg');
const noModal = document.getElementById('noModal');
const yesModal = document.getElementById('yesModal');
const yes = document.getElementById('accept');

start.addEventListener('click', () => {
    document.querySelector('div[data-target="phrase-1"]').classList.remove('hide');
    setTimeout(() => {
        document.querySelector('div[data-target="phrase-2"]').classList.remove('hide');
    }, 5000);
});

show.forEach((item) => {
    item.addEventListener('click', () => {
        document.getElementById("imgFirst").classList.remove('none');
        document.getElementById("hide-1").classList.add('hide');
        setTimeout(() => {
            document.querySelector('div[data-target="phrase-3"]').classList.remove('hide');
            setTimeout(() => {
                document.querySelector('div[data-target="phrase-4"]').classList.remove('hide');
            }, 5000);
        }, 3000);
    });
});

showNext.forEach((item) => {
    item.addEventListener('click', () => {
        document.getElementById("imgSecond").classList.remove('none');
        document.getElementById("hide-2").classList.add('hide');
        setTimeout(() => {
            document.querySelector('div[data-target="phrase-5"]').classList.remove('hide');
            setTimeout(() => {
                document.querySelector('div[data-target="phrase-6"]').classList.remove('hide');
                setTimeout(() => {
                    document.querySelector('div[data-target="phrase-7"]').classList.remove('hide');
                }, 5000);
            }, 8000);
        }, 2000);
    });
});

goFinish.forEach((item) => {
    item.addEventListener('click', () => {

        document.getElementById("figure").classList.remove('hide');
        document.getElementById("hide-3").classList.add('hide');
        setTimeout(() => {
            document.querySelector('div[data-target="phrase-8"]').classList.remove('hide');
            setTimeout(() => {
                document.querySelector('div[data-target="phrase-9"]').classList.remove('hide');
                setTimeout(() => {
                    document.querySelector('div[data-target="phrase-10"]').classList.remove('hide');
                    setTimeout(() => {
                        document.querySelector('div[data-target="phrase-11"]').classList.remove('hide');
                        setTimeout(() => {
                            document.querySelector('div[data-target="phrase-12"]').classList.remove('hide');
                            setTimeout(() => {
                                document.querySelector('div[data-target="phrase-13"]').classList.remove('hide');
                            }, 4000);
                        }, 8000);
                    }, 8000);
                }, 8000);
            }, 8000);
        }, 8000)
    });
});

sorry.forEach((item) => {
    item.addEventListener('click', () => {
        noModal.classList.add('active');
    })
})


yes.addEventListener('click', () => {
    yesModal.classList.add('active');
})
