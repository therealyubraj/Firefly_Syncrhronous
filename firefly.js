class Firefly {
    x = floor(random(width));
    y = floor(random(height));
    w = 10;
    h = 10;
    timePeriod = random(1, maxSeconds) * 30;
    xSpeed = floor(random(-5, 5));
    ySpeed = floor(random(-5, 5));
    adjustRate = floor(random(0, 10)) / 100;

    blink() {
        if (frameCount % this.timePeriod <= 10) {
            fill(50, 255, 100);
        } else {
            fill(255);
        }
    }

    show() {
        this.blink();
        this.move();
        rect(this.x, this.y, this.w, this.h);
    }

    move() {
        let dirX = 1,
            dirY = 1;
        let outward = width;
        let targetX = floor(random(-outward, width + outward));
        let targetY = floor(random(-outward, height + outward));

        dirX = Math.sign(targetX - this.x);
        dirY = Math.sign(targetY - this.y);

        let newXSpeed = constrain(this.xSpeed + floor(random(1, 2)) * dirX, -7, 7);
        let newYSpeed = constrain(this.ySpeed + floor(random(1, 2)) * dirY, -7, 7);

        this.xSpeed = newXSpeed;
        this.ySpeed = newYSpeed;

        this.x += this.xSpeed;
        this.y += this.ySpeed;
    }

    adjustTime(closestTime){
        //let a = this.timePeriod;
        this.timePeriod += this.adjustRate * closestTime * Math.sign(closestTime - this.timePeriod);
        this.timePeriod = constrain(this.timePeriod, 1, maxSeconds * 30);
        //console.log(a + ' ' + this.timePeriod);
    }
}