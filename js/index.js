// 功能1： 页面滚动，改变头部透明度
;
(function () {
    var jd_header = document.querySelector(".jd_header");
    window.addEventListener("scroll", function () {
        var scrollTop = window.pageYOffset;
        var opacity = 0;
        if (scrollTop > 600) {
            opacity = 0.9;
        } else {
            opacity = scrollTop / 600 * 0.9;
        }
        jd_header.style.backgroundColor = "rgba(222, 24, 27, " + opacity + ")";
    })
})();

// 功能2: 动态设置秒杀底部 ul 的宽度
;
(function () {
    var ul = document.querySelector('.seckill_content ul');
    var lis = ul.children;
    var width = lis.length * lis[0].offsetWidth;
    ul.style.width = width + 'px';
})();

//功能3：倒计时功能
;
(function () {
    var spans = document.querySelectorAll(".seckill_title .time span:nth-child(2n-1)");

    setTime();
    var timer = setInterval(setTime, 1000);

    function setTime() {
        var seckillTime = new Date("2018/11/8 22:00");
        var now = new Date();
        var time = parseInt((seckillTime - now) / 1000);

        if (time <= 0) {
            clearInterval(timer);
            time = 0;
        }
        var hours = parseInt(time / 3600);
        var minites = parseInt(time / 60) % 60;
        var seconds = time % 60;

        spans[0].innerHTML = addZero(hours);
        spans[1].innerHTML = addZero(minites);
        spans[2].innerHTML = addZero(seconds);

    }

    function addZero(n) {
        return n < 10 ? '0' + n : n;
    }
})();


//功能4：新闻快报效果
;
(function () {
    var ul = document.querySelector(".jd_news .info ul");
    var lis = ul.children;
    var liHeight = lis[0].offsetHeight;
    var index = 0;
    setInterval(function () {

        if (index >= lis.length - 1) {
            index = 0;
            ul.style.transition = "none";
            ul.style.transform = "translateY(0px)";
        }
        //回流与重绘
        ul.offsetWidth;

        index++;
        ul.style.transition = "transform .5s";
        ul.style.transform = "translateY(-" + index * liHeight + "px)";
    }, 1000);

    // ul.addEventListener("transitionend", function () {
    //     if (index >= lis.length - 1) {
    //         index = 0;
    //         ul.style.transition = "none";
    //         ul.style.transform = "translateY(0px)";
    //     }
    // })


})();


// 功能让5：轮播图效果
;
(function () {
    var ul = document.querySelector(".jd_banner ul");
    var lis = ul.children;
    var width = lis[0].offsetWidth;
    var olLis = document.querySelectorAll(".jd_banner ol li");
    var index = 1;

    var timer = setInterval(function () {
        index++;
        addTransition();
        setTranslateX(-index * width);
    }, 2000);

    ul.addEventListener("transitionend", function () {
        if (index >= lis.length - 1) {
            index = 1;
            removeTransition();
            setTranslateX(-index * width);
        }
        if (index <= 0) {
            index = lis.length - 2;
            removeTransition();
            setTranslateX(-index * width);
        }

        olLis.forEach(function (v, i) {
            v.classList.remove("current");
        })
        olLis[index - 1].classList.add("current");
    })

    function addTransition() {
        ul.style.transition = "transform .2s";
        ul.style.webkitTransition = "transform .2s";
    }

    function removeTransition() {
        ul.style.transition = "none";
        ul.style.webkitTransition = "none";
    }

    function setTranslateX(value) {
        ul.style.transform = " translateX(" + value + "px)";
        ul.style.webkitTransform = " translateX(" + value + " px)";
    }


    var startX;
    var startTime;
    ul.addEventListener('touchstart', function (e) {
        startTime = new Date();
        clearInterval(timer);
        startX = e.touches[0].clientX;
    })
    ul.addEventListener('touchmove', function (e) {
        var distanceX = e.touches[0].clientX - startX;
        console.log(distanceX);
        removeTransition();
        setTranslateX(-index * width + distanceX);
    })
    ul.addEventListener('touchend', function (e) {
        var time = new Date() - startTime;
        var distanceX = e.changedTouches[0].clientX - startX;
        if (distanceX > width / 3 || (time > 300 && distanceX > 50)) {
            index--;
        }
        if (distanceX < -width / 3 || (time > 300 && distanceX < -50)) {
            index++;
        }
        addTransition();
        setTranslateX(-index * width);

        timer = setInterval(function () {
            index++;
            addTransition();
            setTranslateX(-index * width);
        }, 2000)
    })

    window.addEventListener("resize", function () {
        width = lis[0].offsetWidth;
        removeTransition();
        setTranslateX(-index * width);
    })


})();