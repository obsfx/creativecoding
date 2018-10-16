let SIDE        = 10,
    TRIG_H      = 55,
    TRIANGLES   = [],
    ANIM_QUEUE  = [],
    M           = 0.55,
    FR          = 0, 
    MARGIN_TOP  = -1000,
    OFFSET;

function setup() {
    createCanvas(600, 600);
    noStroke();

    for (let i = 0; i < SIDE; i++) {
        TRIANGLES.push([]);
        for (let j = 0; j < SIDE; j++) {
            let t = (j % 2 == 0) ? true : false; 
            TRIANGLES[i].push(new triangle_(null, null, TRIG_H, t));
        }
    }
}

function draw() {
    background("#B0A990");

    MARGIN_TOP = lerp(MARGIN_TOP, 0, 0.05);
    OFFSET = (width - SIDE * TRIG_H * (Math.sqrt(3)/2) * M) / 2;

    if (FR > 60 && FR < 100) M = lerp(M, 0.8, 0.08);
    if (FR > 100 && ANIM_QUEUE.length < SIDE * SIDE){
        M = lerp(M, 0.75, 0.05);
        TRIG_H = lerp(TRIG_H, 45, 0.04);
        ANIM_QUEUE.push({from: 0, to: -PI / 6});
    } 
    
    for (let i in ANIM_QUEUE) {
        ANIM_QUEUE[i].from = lerp(ANIM_QUEUE[i].from, ANIM_QUEUE[i].to, 0.1);
    }
    
    for (let i = 0; i < SIDE; i++) {
        for (let j = 0; j < SIDE; j++) {

            
            if (i % 2 == 0) {
                fill("#202030");
                stroke("#202030");
            } else {
                if (FR < 61) fill("#39304A");
                else noFill();
                stroke("#39304A");
            }

            let c = OFFSET + (j + 0.5) * TRIG_H * (Math.sqrt(3)/2) * M;
            let r = OFFSET + (i + 0.5) * TRIG_H * (Math.sqrt(3)/2) * M + MARGIN_TOP;

            TRIANGLES[i][j].x = c;
            TRIANGLES[i][j].y = r;

            push();
            if (ANIM_QUEUE[i * SIDE + j]) {
                translate(c, r);
                rotate(ANIM_QUEUE[i * SIDE + j].from);
                translate(-c, -r);

                stroke("#090C02");
                if (i % 2 == 0) fill("#090C02");
                else {
                    noFill();
                    strokeWeight(1);
                    stroke("#B0A990");
                }
            }
            TRIANGLES[i][j].draw();
            pop();
        }
    }

    if (FR > 240) {
        MARGIN_TOP = lerp(MARGIN_TOP, 1000, 0.05);
        if (FR > 280) {
            FR = 0; 
            ANIM_QUEUE = []; 
            MARGIN_TOP = -1000, 
            M = 0.55; 
            TRIG_H = 50;
        }
    }

    FR++;
}