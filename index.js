function generate_points(x, gap) {
    let res = [];
    for (let i = 0; i <= x; i+=gap){
        res.push(i);
    }
    return res;
}

function y(x){
    return x*(Math.pow(3, x)-1);
}

let max_point = 6;
let gap = 0.5;
let a = generate_points(max_point, gap).map(y);
let b = generate_points(max_point, gap).map(x => Math.pow(x, 2)*3);

let config = {
    type: 'line',

    // The data for our dataset
    data: {
        labels: generate_points(max_point, gap),
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
        a = generate_points(max_point, gap).map(y);
        config.data.labels = generate_points(max_point, gap);
        config.data.datasets.forEach(function(dataset) {
            dataset.data = generate_points(max_point, gap).map(dataset.fun);
        });
        window.myLine.update();
    }
});
