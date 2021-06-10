$(() => {
    const whoosh = new Audio('sound/whoosh.mp3');
    const bell = new Audio('sound/bell.mp3');
    let $ty = $('#thankyou');
    let $gifts = $('.gift');
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
        let mq = window.matchMedia("(max-width: 768px)");
        if (!mq.matches) {
            let o = $ty.offset();
            let o2 = $gift.offset();
            $gift.find('.card').attr('style', `top: ${o.top - o2.top + 100}px; left: ${o.left - o2.left + 150}px;`);
        }
        whoosh.play();
    }).on('mouseleave', e => {
        let $gift = $(e.target);
        $gift.removeClass('openl');
        $gift.removeClass('openr');
        $gift.find('.card').attr('style', '');
    });

});
