createjs.Sound.on("fileload", PlaySound);
createjs.Sound.registerSound("sound/intro.ogg", "play");
function PlaySound() {createjs.Sound.play("play");}

var canvas = document.getElementById('canvas'),
    stage = new createjs.Stage(canvas),
    canvasWrapper = document.getElementById('canvas-wrapper'),
    squareAll = document.querySelectorAll(".square");

function displayBlock(num) {squareAll[num].style.display = "block";}


// белый куб
TweenMax.to(squareAll[3], 0.766, { 
    delay: 0.066, // 2 кадра задержка в начале
    onStart: displayBlock(3),
    scaleX: 121,
    scaleY: 121,
    rotationZ: 45
});


// серый куб
TweenMax.to(squareAll[2], 0.001, {
    delay: 0.265,
    onStart: displayBlock(2),
    scaleX: 69,
    scaleY: 69
});

TweenMax.to(squareAll[2], 1.065, {
    delay: 0.266,
    scaleX: 735,
    scaleY: 735
});


//желтый куб
TweenMax.to(squareAll[1], 0.001, {
    delay: 0.431,
    onStart: displayBlock(1),
    scaleX: 114,
    scaleY: 114
});

TweenMax.to(squareAll[1], 1, {
    delay: 0.432,
    scaleX: 750,
    scaleY: 750
});


// темно-серый куб
TweenMax.to(squareAll[0], 0.001, {
    delay: 0.531,
    onStart: displayBlock(0),
    scaleX: 107,
    scaleY: 107
});

TweenMax.to(squareAll[0], 0.892, {
    delay: 0.532    ,
    scaleX: 720,
    scaleY: 720
});


//голубой бордер круга (draw)

var circle = new createjs.Shape();

var cirOpt = {cp0x0: 543, cp0y0: 37, cp0x1: 738, cp0y1: 37, cp1x0: 955, cp1y0: 263, cp1x1: 972, cp1y1: 438, cp2x0: 718, cp2y0: 692, cp2x1: 543, cp2y1: 675, cp3x0: 317, cp3y0: 458, cp3x1: 317, cp3y1: 263}

stage.addChild(circle);

var strokeOpt = {dash: 1855, style: 2}

TweenMax.to(strokeOpt, 0.965, {
    delay: 0.665,
    dash: 0,
    onUpdate: function () {
        circle.graphics.clear()
            .setStrokeStyle(strokeOpt.style+=1.7, [caps = "round"])
            .beginStroke("#3CD3FD")
            .setStrokeDash([1855, 1855], strokeOpt.dash)
            .mt(431, 151)
            .bt(cirOpt.cp0x0, cirOpt.cp0y0, cirOpt.cp0x1, cirOpt.cp0y1, 849, 152)
            .bt(cirOpt.cp1x0, cirOpt.cp1y0, cirOpt.cp1x1, cirOpt.cp1y1, 849, 570)
            .bt(cirOpt.cp2x0, cirOpt.cp2y0, cirOpt.cp2x1, cirOpt.cp2y1, 431, 570)
            .bt(cirOpt.cp3x0, cirOpt.cp3y0, cirOpt.cp3x1, cirOpt.cp3y1, 431, 151)
            .endStroke();
    },
    ease: Power2.easeOut,
    onComplete: function () {canvasWrapper.style.transform = "rotate(0deg)";}
});


// морфинг белого круга с падением вниз

var circle_B = new createjs.Shape();
cirOpt_B = {w: 242, h: 242, x: 519, y: 239}

circle_B.graphics
    .f("#fdfdfd")
    .de(cirOpt_B.x, cirOpt_B.y, cirOpt_B.w, cirOpt_B.h)
    .endStroke();

TweenMax.to(squareAll[3], 1.065, {
    delay: 0.8,
    onStart: function () {stage.addChild(circle_B)},
    rotationZ: 2450,
    opacity: 0,
    ease: Power2.easeIn
});

TweenMax.to(cirOpt_B, 0.8, {
    delay: 1.665,
    y: 710,
    x: 632.5,
    w: 15,
    h: 30,
    onUpdate: function () {
        circle_B.graphics.clear()
        circle_B.graphics
            .f("#fdfdfd")
            .de(cirOpt_B.x, cirOpt_B.y, cirOpt_B.w, cirOpt_B.h)
            .endStroke();
    },
    ease: Power1.easeIn
});


//рост белого круга (mask)

var scene = new createjs.Shape();
    sceneOpt = {x: 640, y: 720, rad: 43}
    stage.addChild(scene);


TweenMax.to(scene, 0.001, {
    delay: 2.529,
    onUpdate: function () {
        scene.graphics
            .f("#fdfdfd")
            .dc(sceneOpt.x, sceneOpt.y, sceneOpt.rad)
    },
    onComplete: function () {stage.removeChild(circle_B)}
});

TweenMax.to(sceneOpt, 1.165, {
    delay: 2.53,
    x: 640,
    y: 720,
    rad: 1020,
    onUpdate: function () {
        scene.graphics.clear()
        scene.graphics
            .f("#fdfdfd")
            .dc(sceneOpt.x, sceneOpt.y, sceneOpt.rad)
    },
    ease: Power1.easeOut
})


//текст под маской

var text = new createjs.Text("YOUR NAME", "58px Rubik", "#343434");
    text.textBaseline = "middle";
    text.textAlign = "center";
    text.x = 640;
    text.y = 360;
    text.maxWidth = 315;


// верхний треугольник под маской

var trUpOpt = {
    p0x: 716,
    p0y: 197,
    p1x: 804,
    p1y: 438,
    p2x: 476,
    p2y: 285
}

var triagUp = new createjs.Shape();
triagUp.graphics
    .f("#343434")
    .lt(trUpOpt.p0x, trUpOpt.p0y).lt(trUpOpt.p1x, trUpOpt.p1y).lt(trUpOpt.p2x, trUpOpt.p2y)
    .endStroke();

TweenMax.to(trUpOpt, 0.832, {
    delay: 2.63,
    p0x: 640,
    p0y: 180,
    p1x: 820,
    p1y: 360,
    p2x: 460,
    p2y: 360,
    onUpdate: function () {
        triagUp.graphics.clear()
            .f("#343434")
            .lt(trUpOpt.p0x, trUpOpt.p0y).lt(trUpOpt.p1x, trUpOpt.p1y).lt(trUpOpt.p2x, trUpOpt.p2y)
            .endStroke();
    },
    ease: Power4.easeOut
});


// нижний треугольник под маской

var trDwnOpt = {
    p0x: 565,
    p0y: 523,
    p1x: 804,
    p1y: 436,
    p2x: 477,
    p2y: 283
}

var triagDown = new createjs.Shape();
triagDown.graphics
    .f("#343434")
    .lt(trDwnOpt.p0x, trDwnOpt.p0y).lt(trDwnOpt.p1x, trDwnOpt.p1y).lt(trDwnOpt.p2x, trDwnOpt.p2y)
    .endStroke();

TweenMax.to(trDwnOpt, 0.832, {
    delay: 2.63,
    p0x: 640,
    p0y: 540,
    p1x: 820,
    p1y: 360,
    p2x: 460,
    p2y: 360,
    onUpdate: function () {
        triagDown.graphics.clear()
            .f("#343434")
            .lt(trDwnOpt.p0x, trDwnOpt.p0y).lt(trDwnOpt.p1x, trDwnOpt.p1y).lt(trDwnOpt.p2x, trDwnOpt.p2y)
            .endStroke();
    },
    ease: Power4.easeOut
});


TweenMax.to(" ", 0.001, {delay: 2.628, onStart: function () {stage.addChild(triagUp), stage.addChild(triagDown)}}); // добавить треугольники под маску

TweenMax.to(text, 0.001, {delay: 3.128, onStart: function () {stage.addChild(text)}}); //добавить текст под маску

text.mask = scene;
triagUp.mask = scene;
triagDown.mask = scene;

TweenMax.to(circle, 0.001, {delay: 2.895, onStart: function () {circle.graphics.clear()}}); // убрать голубой бордер


//появление текста 

TweenMax.to(trUpOpt, 0.632, {
    delay: 3.466,
    p0x: 640,
    p0y: 180,
    p1x: 774,
    p1y: 313,
    p2x: 506,
    p2y: 313,
    onUpdate: function () {
        triagUp.graphics.clear()
            .f("#343434")
            .lt(trUpOpt.p0x, trUpOpt.p0y).lt(trUpOpt.p1x, trUpOpt.p1y).lt(trUpOpt.p2x, trUpOpt.p2y)
            .endStroke();
    },
    ease: Power2.easeOut
});

TweenMax.to(trDwnOpt, 0.632, {
    delay: 3.466,
    p0x: 640,
    p0y: 540,
    p1x: 774,
    p1y: 407,
    p2x: 506,
    p2y: 407,
    onUpdate: function () {
        triagDown.graphics.clear()
            .f("#343434")
            .lt(trDwnOpt.p0x, trDwnOpt.p0y).lt(trDwnOpt.p1x, trDwnOpt.p1y).lt(trDwnOpt.p2x, trDwnOpt.p2y)
            .endStroke();
    },
    ease: Power2.easeOut
});


TweenMax.ticker.addEventListener("tick", stage.update, stage);
TweenMax.ticker.fps(60);