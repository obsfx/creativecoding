function triangle_(x, y, r, t) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.t = t;
}

triangle_.prototype.draw = function() {
    let p = this.representPoints();
    triangle(p[0], p[1], p[2], p[3], p[4], p[5]);
}

triangle_.prototype.representPoints = function() {
    let h = this.r * (Math.sqrt(3)/2);

    if (this.t) return [this.x, this.y - h / 2, 
        this.x - this.r / 2, this.y + h / 2, 
        this.x + this.r / 2, this.y + h / 2];
    else return [this.x - this.r / 2, this.y - h / 2, 
        this.x + this.r / 2, this.y - h / 2, 
        this.x, this.y + h / 2];
}