function generate_points(start, x, gap) {
    let res = [];
    for (let i = start; i <= x; i+=gap){
        res.push(i);
    }
    return res;
}

function y(x){
    return x*(Math.pow(3, x)-1);
}

function y_prime(x, y){
    return (1 + y/x)*Math.log((x + y)/x) + y/x;
}

function Euler(x0, y0, fun, gap){
    let path = generate_points(x0, max_point, gap);
    let res = [];
    res[0] = y0;
    for (let i = 1; i <= max_point/gap; i++){
        res.push(res[i-1] + gap*fun(path[i-1], res[i-1]));
        console.log(res[i-1]);
    }
    return res;
}

let max_point = 6;
let gap = 0.5;
let a = generate_points(0, max_point, gap).map(y);
let b = Euler(1, 2, y_prime, gap);
let x0 = 1;
let y0 = 2;

//building the graph
let config = {
    type: 'line',

    data: {
        labels: generate_points(0, max_point, gap),
        datasets: [{
            label: 'y(x)',
            borderColor: '#10B5CD',
            data: a,
            lineTension: 0,
            fill: 'none',
            fun: y
        },{
            label: 'f(x)',
            borderColor: '#cdc868',
            data: b,
            lineTension: 0,
            fill: 'none',
            fun: x => Math.pow(x, 2)*3
        }]
    },
    options: {}
};

let ctx = document.getElementById('myChart').getContext('2d');
window.myLine = new Chart(ctx, config);

let delete_item = document.getElementById('delete_item').addEventListener('click', function () {
    config.data.labels.splice(-1, 1);
    max_point = max_point > 0 ? max_point - gap : 0;
    config.data.datasets.forEach(function(dataset) {
        dataset.data.pop();
    });
    window.myLine.update();
});

//todo: 1. Fix the bag with adding numbers after changing the gap
//      2. Continue implementing the functionality

let add_item = document.getElementById('add_item').addEventListener('click', function () {
    config.data.labels.push(max_point += gap);
    config.data.datasets.forEach(function(dataset) {
        dataset.data.push(dataset.fun(config.data.labels[config.data.labels.length - 1]));
    });
    window.myLine.update();
});

let set_gap = document.getElementById('change_gap').addEventListener('click', function () {
    gap = parseFloat(document.getElementById('gap').value);
    if (gap > 0){
        a = generate_points(0, max_point, gap).map(y);
        config.data.labels = generate_points(0, max_point, gap);
        config.data.datasets.forEach(function(dataset) {
            dataset.data = generate_points(0, max_point, gap).map(dataset.fun);
        });
        window.myLine.update();
    }else {
        alert("WRONG NUMBER");
    }
});
