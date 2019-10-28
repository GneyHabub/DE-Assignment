let max_point = 6;
let gap = 0.5;
let x0 = 1;
let y0 = 2;
let orig = generate_original(x0, y0, max_point,  gap, y);
let euler = generate_Euler(x0, y0, max_point,  gap, y_prime);
let heun = generate_Improved_Euler(x0, y0, max_point,  gap, y_prime);
let runge_kutta = generate_Runge_Kutta(x0, y0, max_point,  gap, y_prime);

let euler_error = function(){
    let res = [];
    for (let i =0; i < orig.length; i++){
        res.push({
            x: i,
            y: orig[i].y - euler[i].y
        });
    }
    return res;
};

let heun_error = function(){
    let res = [];
    for (let i =0; i < orig.length; i++){
        res.push({
            x: i,
            y: orig[i].y - heun[i].y
        });
    }
    return res;
};

let runge_kutta_error = function(){
    let res = [];
    for (let i =0; i < orig.length; i++){
        res.push({
            x: i,
            y: orig[i].y - runge_kutta[i].y
        });
    }
    return res;
};

//building the graphs
let config1 = {
    type: 'line',
    data: {
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
    type: 'horizontalBar',
    data: {
        labels: ['Global Error'],
        datasets:[{
                label: 'Euler',
                borderColor: '#fef75c',
                backgroundColor: 'rgba(254, 247, 92, 0.3)',
                hoverBackgroundColor: 'rgba(254, 247, 92, 0.5)',
                borderWidth: 1,
                data: [
                    config1.data.datasets[0].data[config1.data.datasets[0].data.length - 1].y - config1.data.datasets[1].data[config1.data.datasets[1].data.length - 1].y
                ]
            },
            {
                label: 'Improved Euler (Heun)',
                borderColor: '#F33434',
                backgroundColor: 'rgba(243, 52, 522, 0.3)',
                hoverBackgroundColor:'rgba(243, 52, 522, 0.5)',
                borderWidth: 1,
                data: [
                    config1.data.datasets[0].data[config1.data.datasets[0].data.length - 1].y - config1.data.datasets[2].data[config1.data.datasets[2].data.length - 1].y

                ]
            },
            {
                label: 'Runge Kutta',
                borderColor:'#31D328',
                backgroundColor: 'rgba(49, 211, 40, 0.3)',
                hoverBackgroundColor: 'rgba(49, 211, 40, 0.5)',
                borderWidth: 1,
                data: [
                    config1.data.datasets[0].data[config1.data.datasets[0].data.length - 1].y - config1.data.datasets[3].data[config1.data.datasets[3].data.length - 1].y

                ]
            }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {min: 0}
            }],
            xAxes: [{
                ticks:{beginAtZero: true}
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
                data: euler_error(),
                lineTension: 0,
                fill: 'none'
            },
            {
                label: 'Improved Euler (Heun)',
                borderColor: '#F33434',
                data: heun_error(),
                lineTension: 0,
                fill: 'none'
            },
            {
                label: 'Runge-Kutta',
                borderColor: '#31d328',
                data: runge_kutta_error(),
                lineTension: 0,
                fill: 'none'
            }]
    },
    options: {
        title: "Local Error",
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