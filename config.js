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