
(function(scope, window, $){
    'use strict';

    var app = scope.app = {

        // STATE
        // ==========================================================

        // CONSTANTS
        // ==========================================================

        // REFERENCES
        // ==========================================================
        $window      : $(window),
        $body        : $('body'),
        $header      : $('.header'),
        $subheader   : $('.subheader'),
        $btn         : $('.redo'),
        $heroUnit    : $('.hero-unit'),
        $headerSpans : null,

        init(){
            // console.log('hi');
            this.$heroUnit.blast({
                delimiter : 'character'
            });
            this.$headerSpans = this.$heroUnit.find('span');
            this.sayHello();

            this.$btn.on('click', this.onBtnClick.bind(this));
        },

        getRandom(min, max) {
            return Math.random() * (max - min) + min;
        },

        explodeText($el) {
            var offsetX = this.getRandom(-300, 300);
            var offsetY = this.getRandom(-300, 300);
            var scale = this.getRandom(0.5, 5);
            var delay = this.getRandom(800, 1200);
            var op = this.getRandom(0.75, 0.95);

            $el.velocity({
                    translateX : offsetX,
                    translateY : offsetY,
                    scale      : scale,
                    opacity    : op
                }, {
                    duration : 300
                    // delay  : 500,
                    // easing : [50, 2]
                }).velocity({
                    translateX : 0,
                    translateY : 0,
                    scale      : 1,
                    opacity    : 1
                }, {
                    duration : 300,
                    delay    : delay,
                    easing   : [50, 5],
                    complete : this.onUnexplode
                });
        },

        onUnexplode() {

        },

        onBtnClick() {
            this.sayHello();
        },

        explode() {
            let self = this;
            this.$headerSpans.each(function() {
                self.explodeText($(this));
            });
        },

        getAngle(x1, y1, x2, y2) {
            return Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI + 180;
        },

        explodeTextFromCenter($el, center, randDistX, randDistY, ltr) {
            let elOffset = $el.offset();
            let posX = elOffset.left;
            let posY = elOffset.top;

            let distX = posX <= center.x ? -randDistX : randDistX;
            let distY = posY <= center.y ? -randDistY : randDistY;
            let baseAng = this.getAngle(elOffset.left, elOffset.top, center.x, center.y);
            let ang = this.getRandom(baseAng - 15, baseAng + 15);
            let offsetX = 100 * Math.cos( ang ) + distX;
            let offsetY = 100 * Math.sin( ang ) + distY;
            var scale = this.getRandom(0.5, 2);
            var delay = this.getRandom(800, 1200);

// console.log(ltr, Math.floor(ang), Math.floor(offsetX), Math.floor(offsetY), posX, posY, center.x, center.y);

            $el.velocity({
                translateX : offsetX,
                translateY : offsetY,
                scale      : scale
            }, {
                duration : 300,
                delay    : 100,
                easing   : [250, 15]
            }).velocity({
                translateX : 0,
                translateY : 0,
                scale      : 1
            }, {
                duration : 300,
                delay    : delay,
                easing   : [50, 5]
            });
        },

        explodeFromCenter($el) {
            // console.log(this.$heroUnit);
            let self = this;
            let vertCenter = $el.outerHeight() / 2;
            let horizCenter = $el.outerWidth(true) / 2;
            let center = {x : horizCenter, y : vertCenter};

            let randDistX = this.getRandom(75, 150);
            let randDistY = this.getRandom(75, 150);

            // $('.dot').css({left : center.x, top : center.y});

            this.$headerSpans.each(function() {
                self.explodeTextFromCenter($(this), center, randDistX, randDistY, $(this).text());
            });
        },

        sayHello() {
            let num = Math.floor(this.getRandom(0, 2));
            console.log(num);
            if(num) {
                console.log('just splode');
                this.explode();
            } else {
                console.log('center');
                this.explodeFromCenter(this.$heroUnit);

            }
        }

    };

    $(window).on('load', function(){
        app.init();
    });

})(window.__scope__ || window, window, jQuery);
