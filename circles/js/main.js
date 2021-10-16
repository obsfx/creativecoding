let CIRCLE_COUNT = 20;
let CIRCLES;
let BALLS;
let BALL_SPEED = 0.02;

let CIRCLE_W = 400;
let CIRCLE_H = 220;

let BASE_ANGLE = 0;

let BG_COLOR = [252, 236, 82];
let CIRCLE_COLOR = [58, 87, 67];
let BALL_COLOR = [255, 58, 32];

function init() {
    CIRCLES = new Array(CIRCLE_COUNT).fill(0);
    BALLS = new Array(CIRCLE_COUNT).fill(0);

    for (let i in CIRCLES) {
        CIRCLES[i] = {w: CIRCLE_W, h: CIRCLE_H, angle: PI / CIRCLE_COUNT * i};
    }

    for (let i in BALLS) {
        BALLS[i] = [
            {x: -CIRCLES[i].w / 2, y: 0, r: 9, angle: PI * 2 / CIRCLE_COUNT * i},
            //{x: CIRCLES[i].w / 2, y: 0, r: 9, angle: PI * 2 / CIRCLE_COUNT * i + PI}
        ]
    }
}

function setup() {
    createCanvas(600, 600);
    frameRate(60);

    init();
}

function draw() {
    background(BG_COLOR[0], BG_COLOR[1], BG_COLOR[2]);
    translate(width / 2, height / 2);

    for (let i in CIRCLES) {
        push();

        noFill();
        stroke(CIRCLE_COLOR[0], CIRCLE_COLOR[1], CIRCLE_COLOR[2], 255 / CIRCLE_COUNT * i);
        strokeWeight(1);

        rotate(BASE_ANGLE + CIRCLES[i].angle);

        ellipse(0, 0, CIRCLES[i].w, CIRCLES[i].h)

        noStroke();
        fill(BALL_COLOR[0], BALL_COLOR[1], BALL_COLOR[2], 255 / CIRCLE_COUNT * i);
        
        for (let k in BALLS[i]) {
            let w = h = BALLS[i][k].r * 2;
            ellipse(BALLS[i][k].x, BALLS[i][k].y, w, h);

            BALLS[i][k].x = (CIRCLES[i].w / 2) * cos(BALLS[i][k].angle);
            BALLS[i][k].y = (CIRCLES[i].h / 2) * sin(BALLS[i][k].angle);

            if (BALLS[i][k].angle >= PI * 2) {
                BALLS[i][k].angle -= PI * 2; 
            }
        
            BALLS[i][k].angle += BALL_SPEED;
        }

        pop();
    }

    if (-BASE_ANGLE >= PI * 2) {
        BASE_ANGLE += PI * 2
    }
    BASE_ANGLE -= 0.007;

}