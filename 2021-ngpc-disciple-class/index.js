$(() => {
    const whoosh = new Audio('sound/whoosh.mp3');
    const bell = new Audio('sound/bell.mp3');
    let $ty = $('#thankyou');
    let $gifts = $('.gift');
    let $topLayer = $('.top-layer');
    $ty.on('click', e => {
        $(e.target).addClass('clicked');
        $gifts.addClass('clicked');
        bell.play();
    }).on('animationend', e => {
        $(e.target).removeClass('clicked');
        $gifts.removeClass('clicked');
    });
    $gifts.on('mouseenter', e => {
        let $gift = $(e.target);
        $gift.addClass('open' + (Math.floor(Math.random() * 2) === 1 ? 'r' : 'l'));
        let mq = window.matchMedia("(max-width: 1024px)");
        if (!mq.matches) {
            let o = $ty.offset();
            let o2 = $gift.offset();
            $gift.find('.card').attr('style', `top: ${o.top - o2.top + 100}px; left: ${o.left - o2.left + 150}px;`);
        }
        let giftClass = $gift.attr('class').replace(/.*(gift[0-9]+).*/g, '$1');
        $topLayer.attr('class', 'gift top-layer show '+giftClass);
        whoosh.play();
    }).on('mouseleave', e => {
        let $gift = $(e.target);
        $gift.removeClass('openl');
        $gift.removeClass('openr');
        $gift.find('.card').attr('style', '');
        let giftClass = $gift.attr('class').replace(/.*(gift[0-9]+).*/g, '$1');
        $topLayer.removeClass('show');
        $topLayer.removeClass(giftClass);
    });

});
