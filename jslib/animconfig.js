(function() {
    var $test = $('#test');
      var $countdown = $('.animated');

console.log("go");


    /**new TWEEN.Tween({ x: 0 }).to({ x: 200 }, 2000).easing(TWEEN.Easing.Elastic.InOut).onUpdate(function() {
              $test.css('top', this.x+'px');
              console.log($test);
          }).onComplete(function() {
              $('.animated').css('opacity', 1);

          }).start();

    new TWEEN.Tween({ x: -122 })
        .to({ x: 0 }, 500)
        .delay(500)
        .easing(TWEEN.Easing.Quintic.InOut)
        .onUpdate(function() {
            $countdown.css('top', this.x+'px');
            console.log("oki");
        })
        .onComplete(function() {
            $('#mybutton').css('opacity', 1);
        })
        .start();**/

        var animate = function () {
        requestAnimationFrame(animate);
          TWEEN.update();
      };

      animate();

function getPageInfo() {
        page = scrollAnimate.getPageInfo();
        wHeight = page.wHeight;
        wWidth = page.wWidth;
        wCenter = page.wCenter;    
    }

 function centerH( anim, opts ) {
            getPageInfo();
            var defaults = { offset: 0 },
            settings = $.extend(defaults, opts);
            var elemHalfWidth = anim._elem.width()/2;
            this.properties['left'] = wCenter.left - elemHalfWidth + settings.offset;   
            console.log("center"); 
        };

function leftOutside( anim, opts ) {
            var defaults = {offset:0}, settings = $.extend(defaults, opts);
            this.properties['left'] = anim._elem.width() + settings.offset;
            console.log(-anim._elem.width()+"");
        }

var dwidth = window.innerWidth;
var dwidth = window.innerWidth;

var animation = [
{
        id: 'bg1',
        startAt: 0,
        endAt: 1200,
        keyframes: [{
            position: 0,
            
            properties: { top:0}
        },
        {
            position: 1,
            properties: { top:-50 }
        }]
    },
    {
        id: 'bg2',
        startAt: 900,
        endAt: 2000,
        keyframes: [{
            position: 0,
            properties: { top:1000}
        },
        {
            position: .2,
            properties: { top:0}
        },
        {
            position: 1,
            properties: { top:-100 }
        }]
    },
{
        id: 'phone',
        startAt: 10,
        endAt: 1000,
        keyframes: [{
            position: 0,
            
            properties: { right:-window.innerWidth}
        }, {
            position: .3,
            ease: TWEEN.Easing.Cubic.Out,
            
          properties: {right:window.innerWidth*0.7}
        },
        {
            position: .7,
          properties: {right:window.innerWidth*0.8}
        },
        {
            position: 1,
            ease: TWEEN.Easing.Cubic.In,
            
            properties: { right:window.innerWidth}
        }]
    },
    {
        id: 'agenda',
        startAt: 300,
        endAt: 1000,
        keyframes: [{
            position: 0,
            properties: { top:-100,left:window.innerWidth*0.6}
        }, {
            position: .7,
            ease: TWEEN.Easing.Bounce.Out,
            
          properties: {top:window.innerHeight*0.4,left:window.innerWidth*0.6}
        },
        {
            position: 1,
            ease: TWEEN.Easing.Cubic.In,
            properties: { left:-window.innerWidth*0.6 }
        }]
    },
    {
        id: 'intro',
        startAt: 0,
        endAt: 200,
        keyframes: [{
            position: 0,
        },
        {
            position: 1,
            ease: TWEEN.Easing.Cubic.In,
        }]
    },
{
        id: 'first_text',
        startAt: 400,
        endAt: 1000,
        keyframes: [{
            position: 0,
            
            properties: { right:-100}
        }, {
            position: .3,
            ease: TWEEN.Easing.Cubic.Out,
            
          properties: {right:window.innerWidth*0.35}
        },
        {
            position: .7,
            ease: TWEEN.Easing.Cubic.Out,
            
          properties: {right:window.innerWidth*0.35}
        },
        {
            position: 1,
            ease: TWEEN.Easing.Cubic.In,
            
            properties: { right:window.innerWidth*2 }
        }]
    },
    {
        id: 'clock',
        startAt: 1300,
        endAt: 2000,
        keyframes: [{
            position: 0,
            
            properties: { left:-100,top:window.innerHeight*0.5}
        }, {
            position: .3,
            ease: TWEEN.Easing.Cubic.Out,
            
          properties: {left:window.innerWidth*0.2,top:window.innerHeight*0.5}
        },
        {
            position: .7,
            ease: TWEEN.Easing.Cubic.Out,
            
          properties: {left:window.innerWidth*0.25,top:window.innerHeight*0.5}
        },
        {
            position: 1,
            ease: TWEEN.Easing.Cubic.In,
            
            properties: { left:-window.innerWidth }
        }]
    },
    {
        id: 'calendar',
        startAt: 1000,
        endAt: 2000,
        keyframes: [{
            position: 0,
            
            properties: { left:-100}
        }, {
            position: .3,
            ease: TWEEN.Easing.Cubic.Out,
            
          properties: {left:window.innerWidth*0.2}
        },
        {
            position: .7,
            
          properties: {left:window.innerWidth*0.2}
        },
        {
            position: 1,
            ease: TWEEN.Easing.Cubic.In,
            
            properties: { left:-window.innerWidth }
        }]
    },
    {
        id: 'second_text',
        startAt: 1200,
        endAt: 2000,
        keyframes: [{
            position: 0,
            
            properties: { right:-100}
        }, {
            position: .3,
            ease: TWEEN.Easing.Cubic.Out,
            
          properties: {right:200}
        },
        {
            position: .7,
            ease: TWEEN.Easing.Cubic.Out,
            
          properties: {right:200}
        },
        {
            position: 1,
            ease: TWEEN.Easing.Cubic.In,
            
            properties: { right:10000 }
        }]
    },
    ];

      scrollAnimate = ScrollAnimator();
    scrollAnimate.init({
        animation: animation,
        maxScroll: 2000,
        useRAF : true, // set requestAnimationFrame
        //tickSpeed: 50, // set interval (ms) if not using RAF
        scrollSpeed: 15,
        debug: true, // turn on debug
        tweenSpeed: .3, // scrollTop tween speed
        startAt: 0, // scrollTop where the experience starts
        container: $('#main'),

        // callbacks
        onStartAt: function() {
          console.log("start");
        },
        onResize: function() {
            $('#main').width($(window).width());
        },
        onUpdate: function() {
           
        }
    });



   /**$(window).keydown(function(e) {
        switch(e.keyCode) {
            case 36:
                window.location = '#home';
                break;

            case 35:
                window.location = '#contact';
                break;

            case 39:
            case 40:
                var currentScroll = scrollAnimate.getScrollTop();
                var targetScroll = currentScroll + 25;

                if (targetScroll > scrollAnimate.getMaxScroll()) {
                    targetScroll = currentScroll;
                }

                scrollAnimate.scrollTo(targetScroll);
                break;
            
            case 37:
            case 38:
                var currentScroll = scrollAnimate.getScrollTop();
                var targetScroll = currentScroll - 25;

                if (targetScroll < 0) {
                    targetScroll = 0;
                }

                scrollAnimate.scrollTo(targetScroll);
                break;

            default:
                return;
        }

        e.preventDefault();
    });**/

$(window).on('hashchange', function() {
        checkable = false;
        var hash = window.location.hash.substr(1);

        if($.trim(hash) && typeof sections[hash] === 'object') {
            scrollAnimate.scrollTo(sections[hash]._goto);
        }
        checkable = true;
    }).trigger('hashchange');

    window.scrollAnimate = scrollAnimate;

        console.log("end");
})();