const canvas = document.querySelector("canvas");
const context = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
class Heart {
    constructor() {
        this.x = 0;
        this.y = 0;
        this.scope = 10;
        this.maxSize = 50;
        this.size = 0;
        this.xSpeed = 0;
        this.ySpeed = 0;
        this.color = "";
        this.x = canvas.width / 2;
        this.y = canvas.height / 2;
        this.color = generateRandomColor();
        this.xSpeed = generateRandomNumber(-this.scope, this.scope);
        if (Math.abs(this.xSpeed) < 5) {
            this.ySpeed = generateRandomNumber(-1, 1) > 0 ? generateRandomNumber(-this.scope, -this.scope / 2) : generateRandomNumber(this.scope / 2, this.scope);
        }
        else {
            this.ySpeed = generateRandomNumber(-1, 1) > 0 ? generateRandomNumber(-this.scope / 2, 0) : generateRandomNumber(0, this.scope / 2);
        }
    }
    draw() {
        this.x += this.xSpeed;
        this.y += this.ySpeed;
        let plus = this.size < this.maxSize ? 0.5 : 0;
        this.size += plus;
        context.beginPath();
        let topCurveHeight = this.size * 0.3;
        context.moveTo(this.x, this.y + topCurveHeight);
        // top left curve
        context.bezierCurveTo(this.x, this.y, this.x - this.size / 2, this.y, this.x - this.size / 2, this.y + topCurveHeight);
        // bottom left curve
        context.bezierCurveTo(this.x - this.size / 2, this.y + (this.size + topCurveHeight) / 2, this.x, this.y + (this.size + topCurveHeight) / 1.4, this.x, this.y + this.size);
        // bottom right curve
        context.bezierCurveTo(this.x, this.y + (this.size + topCurveHeight) / 1.4, this.x + this.size / 2, this.y + (this.size + topCurveHeight) / 2, this.x + this.size / 2, this.y + topCurveHeight);
        // top right curve
        context.bezierCurveTo(this.x + this.size / 2, this.y, this.x, this.y, this.x, this.y + topCurveHeight);
        context.closePath();
        context.shadowBlur = 0;
        context.fillStyle = this.color;
        context.fill();
    }
}
const hearts = [];
function generateHeart() {
    hearts.push(new Heart());
}
function loop() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < hearts.length; i++) {
        let heart = hearts[i];
        // 如果从视野消失
        if (heart.x <= -heart.size || heart.x >= (canvas.width + heart.size) || heart.y <= -heart.size || heart.y >= (canvas.height + heart.size)) {
            hearts.splice(i, 1);
        }
        else {
            heart.draw();
        }
    }
    // drawHeart(context, canvas.width / 2, canvas.height / 2 - 25, 50, 50);
    generateHeart();
    requestAnimationFrame(loop);
}
function drawHeart(context, x, y, width, height) {
    context.beginPath();
    var topCurveHeight = height * 0.3;
    context.moveTo(x, y + topCurveHeight);
    // top left curve
    context.bezierCurveTo(x, y, x - width / 2, y, x - width / 2, y + topCurveHeight);
    // bottom left curve
    context.bezierCurveTo(x - width / 2, y + (height + topCurveHeight) / 2, x, y + (height + topCurveHeight) / 1.4, x, y + height);
    // bottom right curve
    context.bezierCurveTo(x, y + (height + topCurveHeight) / 1.4, x + width / 2, y + (height + topCurveHeight) / 2, x + width / 2, y + topCurveHeight);
    // top right curve
    context.bezierCurveTo(x + width / 2, y, x, y, x, y + topCurveHeight);
    context.closePath();
    context.shadowColor = generateRandomColor();
    context.shadowBlur = 10;
    context.fillStyle = "red";
    context.fill();
}
loop();
// 生成随机颜色
function generateRandomColor() {
    let letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}
// 根据最小值和最大值生成随机数
function generateRandomNumber(min = 0, max = 100) {
    return (Math.random() * (max - min)) + min;
}
