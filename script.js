class Rectangle {
    constructor(color, width, height) {
        this.color = color;
        this.width = width;
        this.height = height;
    }
}

let rectangles = [
    new Rectangle('black', 10, 15), // area = 150
    new Rectangle('grey', 12, 13),
    new Rectangle('yellow', 3, 5),
    new Rectangle('black', 40, 12), // area = 480
    new Rectangle('black', 8, 6) //area == 48
];

let hasColor = color => r => r.color === color;
let calculateArea = r => r.width * r.height;
let add = (previous, current) => previous + current;


let filter = predicate => arr => arr.filter(predicate);
let map = func => arr => arr.map(func);
let reduce = accumulator => arr => arr.reduce(accumulator);

function flow(...funcs) {
    switch (funcs.length) {
        case 1:
            return data => funcs[0](data);
        case 2:
            return data => funcs[1](funcs[0](data));
        case 3:
            return data => funcs[2](funcs[1](funcs[0](data)));
        default:
            return function (data) {
                let steps = [...funcs];
                let result = data;
                let step;
                while (steps.length) {
                    step = steps.shift();
                    result = step(result);
                }
                return result;
            }
    }
}

let totalBlackRectArea = flow(
    filter(hasColor('black')),
    map(calculateArea),
    reduce(add),
    console.log
);

totalBlackRectArea(rectangles)
