const BG_COLOR = [88, 53, 94];
const COLORS = [
    [255, 246, 137],
    [122, 231, 199],
    [244, 211, 94],
    [247, 135, 100]
];

let sclX;
let sclY;
let angle = 0;

let DOTS = [];
let CIRCLES = [
    {w: 160, h: 400},
    {w: 160, h: 400}
];

function setup() {
    createCanvas(600, 600);
    noStroke();

    for (let i = 0; i < 30; i++) {
        DOTS.push({x: CIRCLES[0].w / 2, y: 0, r: 50 - i * 1, angle: PI - i * 0.9, o: 40 + i * 5, c: COLORS[1], arc: CIRCLES[0], s: 1});
    }

    for (let i = 0; i < 30; i++) {
        DOTS.push({x: -CIRCLES[1].w / 2, y: 0, r: 50 - i * 1, angle: PI + i * 0.9, o: 40 + i * 5, c: COLORS[0], arc: CIRCLES[1], s: -1});
    }
}

function draw() {
    background(BG_COLOR[0], BG_COLOR[1], BG_COLOR[2]);
    translate(width / 2, height / 2);

    for (let i in CIRCLES) {
        CIRCLES[i].w += sin(-angle * PI / 3) * 2;
        CIRCLES[i].h -= sin(angle * PI / 3) * 3;
    }

    noStroke();
    for (let k in DOTS) {
        let w = h = DOTS[k].r * 2;
        fill(DOTS[k].c[0] - sin(angle) * 20, DOTS[k].c[1] + sin(angle) * 10, DOTS[k].c[2], DOTS[k].o);
        ellipse(DOTS[k].x, DOTS[k].y, w, h);

        DOTS[k].x = DOTS[k].arc.w / 2 * cos(DOTS[k].angle);
        DOTS[k].y = DOTS[k].arc.h / 2 * sin(DOTS[k].angle);
    
        DOTS[k].angle += 0.015 * DOTS[k].s;
    }

    angle += 0.025;

}
