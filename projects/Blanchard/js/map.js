// Функция ymaps.ready() будет вызвана, когда
// загрузятся все компоненты API, а также когда будет готово DOM-дерево.
ymaps.ready(init);
function init() {
    // Создание карты.
    var myMap = new ymaps.Map("map", {
        // Координаты центра карты.
        // Порядок по умолчанию: «широта, долгота».
        // Чтобы не определять координаты центра карты вручную,
        // воспользуйтесь инструментом Определение координат.
        center: [55.76048808839948,37.61481333153713],
        // Уровень масштабирования. Допустимые значения:
        // от 0 (весь мир) до 19.
        zoom: 14,
        controls: []
    });

    var zoomControl = new ymaps.control.ZoomControl({
        options: {
            size: "small",
            position: { top: 275, right: 16 }
        }
    });
    myMap.controls.add(zoomControl);

    var geolocationControl = new ymaps.control.GeolocationControl({
        options: {
            noPlacemark: true,
            position: { top: 360, right: 16 },
            maxWidth: 50
        }
    });
    myMap.controls.add(geolocationControl);


    myPlacemark = new ymaps.Placemark([55.759084579507494,37.614555839471706], {
        hintContent: 'Собственный значок метки',
        balloonContent: 'Это красивая метка'
    }, {
        // Опции.
        // Необходимо указать данный тип макета.
        iconLayout: 'default#image',
        // Своё изображение иконки метки.
        iconImageHref: 'images/mark.svg',
        // Размеры метки.
        iconImageSize: [20, 20],
        // Смещение левого верхнего угла иконки относительно
        // её "ножки" (точки привязки).
        iconImageOffset: [-20, -60]
    }),

        myMap.geoObjects
            .add(myPlacemark)

}