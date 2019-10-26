let max_point = 6;
let gap = 0.5;
let x0 = 1;
let y0 = 2;
let a = generate_original(x0, y0, max_point,  gap, y);
let b = generate_Euler(x0, y0, max_point,  gap, y_prime);
let c = generate_Improved_Euler(x0, y0, max_point,  gap, y_prime);
let d = generate_Runge_Kutta(x0, y0, max_point,  gap, y_prime);

//building the graph
let config1 = {
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
                borderColor: '#31d328',
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

let config2 = {
    type: 'horizontalBar',
    data: {
        labels: ['Euler', 'Improved Euler', 'Runge Kutta'],
        datasets:[{
            label: 'Global Error',
            borderColor: ['#fef75c', '#F33434', '#31D328'],
            backgroundColor: ['rgba(254, 247, 92, 0.3', 'rgba(243, 52, 522, 0.3', 'rgba(49, 211, 40, 0.3'],
            hoverBackgroundColor: ['rgba(254, 247, 92, 0.5', 'rgba(243, 52, 522, 0.5', 'rgba(49, 211, 40, 0.5'],
            borderWidth: 1,
            data: [
                config1.data.datasets[0].data[config1.data.datasets[0].data.length - 1].y - config1.data.datasets[1].data[config1.data.datasets[1].data.length - 1].y,
                config1.data.datasets[0].data[config1.data.datasets[0].data.length - 1].y - config1.data.datasets[2].data[config1.data.datasets[2].data.length - 1].y,
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