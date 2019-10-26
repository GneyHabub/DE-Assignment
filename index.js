function generate_points(start, x, gap) {
    let res = [];
    for (let i = start; i <= x+gap; i+=gap){
        res.push(Number(i.toFixed(3)));
    }
    console.log("Пасхалочка");
    return res;
}

function generate_original(start, y0, end, gap, fun) {
    let path = generate_points(start, end, gap);
    let y_axis = [];
    y_axis.push(y0);
    let res = [];
    for (let i = 1; i <= (end - start)/gap + 1; i++) {
        y_axis.push(fun(path[i]));
    }
    for (let i = 1; i <= (end - start)/gap + 1; i++) {
        res.push({
            x: path[i-1],
            y: y_axis[i-1]
        });
    }
    return res;
}

function generate_Euler(start, y0, end, gap, fun) {
    let path = generate_points(start, end, gap);
    let y_axis = [];
    y_axis.push(y0);
    let res = [];
    for (let i = 1; i < (end - start)/gap + 1; i++) {
        y_axis.push(y_axis[i - 1] + gap * fun(path[i - 1], y_axis[i - 1]));
    }
    for (let i = 1; i <= (end - start)/gap + 1; i++) {
        res.push({
            x: path[i-1],
            y: y_axis[i-1]
        });
    }
    return res;
}

function generate_Improved_Euler(start, y0, end, gap, fun) {
    let path = generate_points(start, end, gap);
    let y_axis = [];
    y_axis.push(y0);
    let res = [];
    for (let i = 1; i < (end - start)/gap + 1; i++) {
        y_axis.push(y_axis[i - 1] + (gap/2) * (fun(path[i - 1], y_axis[i - 1]) + fun(path[i], (y_axis[i-1] + gap*fun(path[i - 1], y_axis[i - 1])))));
    }
    for (let i = 1; i <= (end - start)/gap + 1; i++) {
        res.push({
            x: path[i-1],
            y: y_axis[i-1]
        });
    }
    return res;
}

function generate_Ruhye_Kutta(start, y0, end, gap, fun) {
    let path = generate_points(start, end, gap);
    let y_axis = [];
    y_axis.push(y0);
    let res = [];
    for (let i = 1; i < (end - start)/gap + 1; i++) {
        let k1 = gap*fun(path[i-1], y_axis[i-1]);
        let k2 = gap*fun(path[i-1]+gap/2, y_axis[i-1] + k1/2);
        let k3 = gap*fun(path[i-1]+gap/2, y_axis[i-1] + k2/2);
        let k4 = gap*fun(path[i-1]+gap, y_axis[i-1] + k3);
        y_axis.push(y_axis[i-1] + (k1 + 2*k2 + 2*k3 + k4)/6);
    }
    console.log(y_axis);
    for (let i = 1; i <= (end - start)/gap + 1; i++) {
        res.push({
            x: path[i-1],
            y: y_axis[i-1]
        });
    }
    return res;
}

function y(x){
    return x*(Math.pow(3, x)-1);
}

function y_prime(x, y){
    return (1 + y/x)*Math.log((x + y)/x) + y/x;
}

let max_point = 6;
let gap = 0.5;
let x0 = 1;
let y0 = 2;
let a = generate_original(x0, y0, max_point,  gap, y);
let b = generate_Euler(x0, y0, max_point,  gap, y_prime);
let c = generate_Improved_Euler(x0, y0, max_point,  gap, y_prime);
let d = generate_Ruhye_Kutta(x0, y0, max_point,  gap, y_prime);

//building the graph
let config = {
    type: 'line',

    data: {
        labels: generate_points(0, max_point, gap),
        datasets: [
            {
                label: 'y(x)',
                borderColor: '#10B5CD',
                data: a,
                lineTension: 0,
                fill: 'none'
            },
            {
                label: 'Euler',
                borderColor: '#fef75c',
                data: b,
                lineTension: 0,
                fill: 'none'
            },
            {
                label: 'Improved Euler',
                borderColor: '#F33434',
                data: c,
                lineTension: 0,
                fill: 'none'
            },
            {
                label: 'Ruhye-Kutta',
                borderColor: '#bc24f3',
                data: d,
                lineTension: 0,
                fill: 'none'
            }]
    },
    options: {
        scales: {
            xAxes: [{
                type: 'linear',
                position: 'bottom',
                ticks: {beginAtZero: true}
            }],
            yAxes: [{
                display: true,
                ticks: {beginAtZero: true}
            }]
        }
    }
};

let ctx = document.getElementById('myChart').getContext('2d');
window.myLine = new Chart(ctx, config);

function update_graphs(){
    config.data.datasets[0].data = generate_original(x0, y0, max_point, gap, y);
    config.data.datasets[1].data = generate_Euler(x0, y0, max_point, gap, y_prime);
    config.data.datasets[2].data = generate_Improved_Euler(x0, y0, max_point, gap, y_prime);
    config.data.datasets[3].data = generate_Ruhye_Kutta(x0, y0, max_point, gap, y_prime);
    window.myLine.update();
}

let set_gap = document.getElementById('change_gap').addEventListener('click', function () {
    if (parseFloat(document.getElementById('gap').value) > 0){
        gap = parseFloat(document.getElementById('gap').value);
        update_graphs();
    }else {
        alert("WRONG NUMBER");
    }
    document.getElementById('gap').value = null;
    document.getElementById('gap_value').innerText =  gap;
});

let set_max_point = document.getElementById('change_max_point').addEventListener('click', function () {
    if (parseFloat(document.getElementById('max_point').value) > 0 && parseFloat(document.getElementById('max_point').value) <= 100){
        max_point = parseFloat(document.getElementById('max_point').value);
        update_graphs();
    }else {
        alert("WRONG NUMBER");
    }
    document.getElementById('max_point').value = null;
    document.getElementById('max_point_value').innerText =  max_point;
});

let set_x0 = document.getElementById('change_x0').addEventListener('click', function () {
    if (parseFloat(document.getElementById('x0').value) > 0 && parseFloat(document.getElementById('x0').value) < max_point){
        x0 = parseFloat(document.getElementById('x0').value);
        update_graphs();
    }else {
        alert("WRONG NUMBER");
    }
    document.getElementById('x0').value = null;
    document.getElementById('x0_value').innerText =  x0;
});

let set_y0 = document.getElementById('change_y0').addEventListener('click', function () {

    if (parseFloat(document.getElementById('y0').value) > 0 ){
        y0 = parseFloat(document.getElementById('y0').value);
        update_graphs();
    }else {
        alert("WRONG NUMBER");
    }
    document.getElementById('y0').value = null;
    document.getElementById('y0_value').innerText =  y0;
});

let theme = 'light';
let theme_to_dark = document.getElementById('change_theme').onclick= function () {
    if (theme === 'dark'){
        theme = 'light';
        document.getElementById('theme').href = "https://cdn.jsdelivr.net/gh/kognise/water.css@latest/dist/light.min.css";
        document.getElementById('change_theme').src = 'img/sun.png';
    }else if (theme === 'light'){
        theme = 'dark';
        document.getElementById('theme').href = "https://cdn.jsdelivr.net/gh/kognise/water.css@latest/dist/dark.min.css";
        document.getElementById('change_theme').src = 'img/moon.png';
    }else {
        alert("OOOOPS, SOMETHING WENT WRONG!");
    }
};
