function generate_points(start, x, gap) {
    let res = [];

    for (let i = start; i <= x+0.00001; i += gap){
        res.push(Number(i.toFixed(3)));
    }
    return res;
}

function generate_original(start, y0, end, gap, fun) {
    let path = generate_points(start, end, gap);
    let y_axis = [];
    y_axis.push(y0);
    let res = [];
    let c = (Math.log((y0/start)+1))/start;
    for (let i = 1; i <= (end - start)/gap + 1; i++) {
        y_axis.push(parseFloat(fun(path[i], c)));
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

function generate_Runge_Kutta(start, y0, end, gap, fun) {
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
    for (let i = 1; i <= (end - start)/gap + 1; i++) {
        res.push({
            x: path[i-1],
            y: y_axis[i-1]
        });
    }
    return res;
}


function y(x, c){
    return (x*(Math.exp(x*c)-1)).toPrecision(10);
}

function y_prime(x, y){
    return (1 + y/x)*Math.log((x + y)/x) + y/x;
}
