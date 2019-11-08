let max_point = 6;
let gap = 0.5;
let x0 = 1;
let y0 = 2;
let n0 = 10;
let n1 = 100;
let orig = generate_original(x0, y0, max_point,  gap, y);
let euler = generate_Euler(x0, y0, max_point,  gap, y_prime);
let heun = generate_Improved_Euler(x0, y0, max_point,  gap, y_prime);
let runge_kutta = generate_Runge_Kutta(x0, y0, max_point,  gap, y_prime);

//building the graphs
let config1 = {
    type: 'line',
    data: {
        labels: generate_points(0, max_point, gap),
        datasets: [
            {
                label: 'y(x)',
                borderColor: '#ffffff',
                data: orig,
                lineTension: 0,
                fill: 'none'
            },
            {
                label: 'Euler',
                borderColor: '#17fcfe',
                data: euler,
                lineTension: 0,
                fill: 'none'
            },
            {
                label: 'Improved Euler (Heun)',
                borderColor: '#f31ee1',
                data: heun,
                lineTension: 0,
                fill: 'none'
            },
            {
                label: 'Runge-Kutta',
                borderColor: '#7210d3',
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
                ticks: {beginAtZero: true},
                scaleLabel: {
                    display: true,
                    labelString: 'X'
                }
            }],
            yAxes: [{
                display: true,
                ticks: {beginAtZero: true},
                scaleLabel: {
                    display: true,
                    labelString: 'Y'
                }
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
                borderColor: '#17fcfe',
                data: local_euler(x0, y0, max_point, gap, y_prime, orig),
                lineTension: 0,
                fill: 'none'
            },
            {
                label: 'Improved Euler (Heun)',
                borderColor: '#f31ee1',
                data: local_heun(x0, y0, max_point, gap, y_prime, orig),
                lineTension: 0,
                fill: 'none'
            },
            {
                label: 'Runge-Kutta',
                borderColor: '#7210d3',
                data: local_runge_kutta(x0, y0, max_point, gap, y_prime, orig),
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
                ticks: {beginAtZero: true},

                scaleLabel: {
                    display: true,
                    labelString: 'X'
                }
            }],
            yAxes: [{
                display: true,
                ticks: {beginAtZero: true},
                scaleLabel: {
                    display: true,
                    labelString: 'y'
                }
            }]
        }
    }
};

let config3 = {
    type: 'line',
    data: {
        labels: generate_points(n0, n1, 1),
        datasets: [
            {
                label: 'Euler',
                borderColor: '#17fcfe',
                data: global_euler(x0, y0, max_point, orig, n0, n1),
                lineTension: 0,
                fill: 'none'
            },
            {
                label: 'Improved Euler (Heun)',
                borderColor: '#f31ee1',
                data: global_heun(x0, y0, max_point, orig, n0, n1),
                lineTension: 0,
                fill: 'none'
            },
            {
                label: 'Runge-Kutta',
                borderColor: '#7210d3',
                data: global_runge_kutta(x0, y0, max_point, orig, n0, n1),
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
                ticks: {beginAtZero: false},
                scaleLabel: {
                    display: true,
                    labelString: 'N'
                }
            }],
            yAxes: [{
                display: true,
                ticks: {beginAtZero: true},
                scaleLabel: {
                    display: true,
                    labelString: 'Y'
                }
            }]
        }
    }
};
