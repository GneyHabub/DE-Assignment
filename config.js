let max_point = 6;
let gap = 0.5;
let x0 = 1;
let y0 = 2;
let orig = generate_original(x0, y0, max_point,  gap, y);
let euler = generate_Euler(x0, y0, max_point,  gap, y_prime);
let heun = generate_Improved_Euler(x0, y0, max_point,  gap, y_prime);
let runge_kutta = generate_Runge_Kutta(x0, y0, max_point,  gap, y_prime);

let local_euler = function (start, y0, end, gap, fun){
    let path = generate_points(start, end, gap);
    let y_axis = [];
    y_axis.push(y0);
    for (let i = 1; i <= (end - start)/gap + 1; i++) {
        y_axis.push(orig[i - 1].y + gap * fun(path[i - 1], orig[i - 1].y));
    }
    let ans = [];
    for (let i = 0; i < (end - start)/gap + 1; i++) {
        ans.push({
            x: path[i],
            y: orig[i].y - y_axis[i]
        });
    }
    console.log(orig);
    return ans;
};

let local_heun = function (start, y0, end, gap, fun){
    let path = generate_points(start, end, gap);
    let y_axis = [];
    y_axis.push(y0);
    for (let i = 1; i <= (end - start)/gap + 1; i++) {
        y_axis.push(orig[i - 1].y + (gap/2) * (fun(path[i - 1], orig[i - 1].y) + fun(path[i], (orig[i - 1].y + gap*fun(path[i - 1], orig[i - 1].y)))));
    }
    let ans = [];
    for (let i = 0; i < (end - start)/gap + 1; i++) {
        ans.push({
            x: path[i],
            y: orig[i].y - y_axis[i]
        });
    }
    console.log(orig);
    return ans;
};

let local_runge_kutta = function (start, y0, end, gap, fun){
    let path = generate_points(start, end, gap);
    let y_axis = [];
    y_axis.push(y0);
    for (let i = 1; i <= (end - start)/gap + 1; i++) {
        let k1 = gap*fun(path[i-1], orig[i - 1].y);
        let k2 = gap*fun(path[i-1]+gap/2, orig[i - 1].y + k1/2);
        let k3 = gap*fun(path[i-1]+gap/2, orig[i - 1].y + k2/2);
        let k4 = gap*fun(path[i-1]+gap, orig[i - 1].y + k3);
        y_axis.push(orig[i - 1].y + (k1 + 2*k2 + 2*k3 + k4)/6);
    }
    let ans = [];
    for (let i = 0; i < (end - start)/gap + 1; i++) {
        ans.push({
            x: path[i],
            y: orig[i].y - y_axis[i]
        });
    }
    console.log(orig);
    return ans;
};

//building the graphs
let config1 = {
    type: 'line',
    data: {
        title: {
            display: true,
            text: 'GRAPHS'
        },
        labels: generate_points(0, max_point, gap),
        datasets: [
            {
                label: 'y(x)',
                borderColor: '#10B5CD',
                data: orig,
                lineTension: 0,
                fill: 'none'
            },
            {
                label: 'Euler',
                borderColor: '#fef75c',
                data: euler,
                lineTension: 0,
                fill: 'none'
            },
            {
                label: 'Improved Euler (Heun)',
                borderColor: '#F33434',
                data: heun,
                lineTension: 0,
                fill: 'none'
            },
            {
                label: 'Runge-Kutta',
                borderColor: '#31d328',
                data: runge_kutta,
                lineTension: 0,
                fill: 'none'
            }]
    },
    options: {
        title: {
            display: true,
            text: 'GRAPHS',
        },
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

let config2 = {
    type: 'line',
    data: {
        labels: generate_points(0, max_point - x0, gap),
        datasets: [
            {
                label: 'Euler',
                borderColor: '#fef75c',
                data: local_euler(x0, y0, max_point, gap, y_prime),
                lineTension: 0,
                fill: 'none'
            },
            {
                label: 'Improved Euler (Heun)',
                borderColor: '#F33434',
                data: local_heun(x0, y0, max_point, gap, y_prime),
                lineTension: 0,
                fill: 'none'
            },
            {
                label: 'Runge-Kutta',
                borderColor: '#31d328',
                data: local_runge_kutta(x0, y0, max_point, gap, y_prime),
                lineTension: 0,
                fill: 'none'
            }]
    },
    options: {
        title: {
            display: true,
            text: 'LOCAL ERROR'
        },
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

let config3 = {
    type: 'line',
    data: {
        labels: generate_points(0, max_point - x0, gap),
        datasets: [
            {
                label: 'Euler',
                borderColor: '#fef75c',
                data: local_euler(x0, y0, max_point, gap, y_prime),
                lineTension: 0,
                fill: 'none'
            },
            {
                label: 'Improved Euler (Heun)',
                borderColor: '#F33434',
                data: local_heun(x0, y0, max_point, gap, y_prime),
                lineTension: 0,
                fill: 'none'
            },
            {
                label: 'Runge-Kutta',
                borderColor: '#31d328',
                data: local_runge_kutta(x0, y0, max_point, gap, y_prime),
                lineTension: 0,
                fill: 'none'
            }]
    },
    options: {
        title: {
            display: true,
            text: 'GLOBAL ERROR'
        },
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
