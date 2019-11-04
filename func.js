// Function which generates array of integers from starting point to the end one with given step
function generate_points(start, x, gap) {
    let res = [];
    for (let i = start; i <= x+0.00001; i += gap){ //I add 0.00001 to avoid calculation errors because of JS
        res.push(Number(i.toFixed(10)));
    }
    return res;
}

// Function to generate pairs of points, representing Original Function (Analytical Solution)
function generate_original(start, y0, end, gap, fun) {
    let x_axis = generate_points(start, end, gap);
    let y_axis = [];
    y_axis.push(y0);
    let res = [];
    let c = (Math.log((y0/start)+1))/start;
    let dest = Math.round((end - start)/gap + 1);
    for (let i = 1; i <= dest; i++) {
        y_axis.push(parseFloat(fun(x_axis[i], c)));
    }
    for (let i = 1; i <= dest; i++) {
            res.push({
                x: x_axis[i-1],
                y: y_axis[i-1]
            });
    }
    return res;
}

// Function to generate pairs of points, representing Euler Numerical Solution
function generate_Euler(start, y0, end, gap, fun) {
    let x_axis = generate_points(start, end, gap);
    let y_axis = [];
    y_axis.push(y0);
    let res = [];
    let dest = Math.round((end - start)/gap + 1);
    for (let i = 1; i <= dest; i++) {
        y_axis.push(y_axis[i - 1] + gap * fun(x_axis[i - 1], y_axis[i - 1]));
    }
    for (let i = 1; i <= dest; i++) {
        res.push({
            x: x_axis[i-1],
            y: y_axis[i-1]
        });
    }
    return res;
}

// Function to generate pairs of points, representing Heun Numerical Solution
function generate_Improved_Euler(start, y0, end, gap, fun) {
    let x_axis = generate_points(start, end, gap);
    let y_axis = [];
    y_axis.push(y0);
    let res = [];
    let dest = Math.round((end - start)/gap + 1);
    for (let i = 1; i <= dest; i++) {
        y_axis.push(y_axis[i - 1] + (gap/2) * (fun(x_axis[i - 1], y_axis[i - 1]) + fun(x_axis[i], (y_axis[i-1] + gap*fun(x_axis[i - 1], y_axis[i - 1])))));
    }
    for (let i = 1; i <= dest; i++) {
        res.push({
            x: x_axis[i-1],
            y: y_axis[i-1]
        });
    }
    return res;
}

// Function to generate pairs of points, representing Runge-Kutta Numerical Solution
function generate_Runge_Kutta(start, y0, end, gap, fun) {
    let x_axis = generate_points(start, end, gap);
    let y_axis = [];
    y_axis.push(y0);
    let res = [];
    let dest = Math.round((end - start)/gap + 1);
    for (let i = 1; i <= dest; i++) {
        let k1 = gap*fun(x_axis[i-1], y_axis[i-1]);
        let k2 = gap*fun(x_axis[i-1]+gap/2, y_axis[i-1] + k1/2);
        let k3 = gap*fun(x_axis[i-1]+gap/2, y_axis[i-1] + k2/2);
        let k4 = gap*fun(x_axis[i-1]+gap, y_axis[i-1] + k3);
        y_axis.push(y_axis[i-1] + (k1 + 2*k2 + 2*k3 + k4)/6);
    }
    for (let i = 1; i <= dest; i++) {
        res.push({
            x: x_axis[i-1],
            y: y_axis[i-1]
        });
    }
    return res;
}

// Function got after analytical solving
function y(x, c){
    return (x*(Math.exp(x*c)-1)).toPrecision(10);
}

// Original function in the task
function y_prime(x, y){
    return (1 + y/x)*Math.log((x + y)/x) + y/x;
}

// Function to calculate local error in Euler Numerical Solution
let local_euler = function (start, y0, end, gap, fun, orig){
    let x_axis = generate_points(start, end, gap);
    let y_axis = [];
    y_axis.push(y0);
    let dest = Math.round((end - start)/gap + 1);
    for (let i = 1; i <= dest; i++) {
        y_axis.push(orig[i - 1].y + gap * fun(x_axis[i - 1], orig[i - 1].y));
    }
    let ans = [];
    for (let i = 0; i <= dest - 1; i++) {
        ans.push({
            x: x_axis[i],
            y: Math.abs(orig[i].y - y_axis[i])
        });
    }
    return ans;
};

// Function to calculate local error in Heun Numerical Solution
let local_heun = function (start, y0, end, gap, fun, orig){
    let x_axis = generate_points(start, end, gap);
    let y_axis = [];
    y_axis.push(y0);
    let dest = Math.round((end - start)/gap + 1);
    for (let i = 1; i <= dest; i++) {
        y_axis.push(orig[i - 1].y + (gap/2) * (fun(x_axis[i - 1], orig[i - 1].y) + fun(x_axis[i], (orig[i - 1].y + gap*fun(x_axis[i - 1], orig[i - 1].y)))));
    }
    let ans = [];
    for (let i = 0; i <= dest-1; i++) {
        ans.push({
            x: x_axis[i],
            y: Math.abs(orig[i].y - y_axis[i])
        });
    }
    return ans;
};

// Function to calculate local error in Runge-Kutta Numerical Solution
let local_runge_kutta = function (start, y0, end, gap, fun, orig){
    let x_axis = generate_points(start, end, gap);
    let y_axis = [];
    y_axis.push(y0);
    let dest = Math.round((end - start)/gap + 1);
    for (let i = 1; i <= dest; i++) {
        let k1 = gap*fun(x_axis[i-1], orig[i - 1].y);
        let k2 = gap*fun(x_axis[i-1]+gap/2, orig[i - 1].y + k1/2);
        let k3 = gap*fun(x_axis[i-1]+gap/2, orig[i - 1].y + k2/2);
        let k4 = gap*fun(x_axis[i-1]+gap, orig[i - 1].y + k3);
        y_axis.push(orig[i - 1].y + (k1 + 2*k2 + 2*k3 + k4)/6);
    }
    let ans = [];
    for (let i = 0; i <= dest - 1; i++) {
        ans.push({
            x: x_axis[i],
            y: Math.abs(orig[i].y - y_axis[i])
        });
    }
    return ans;
};

// Function to calculate global error in Euler Numerical Solution for given steps
let global_euler = function (x0, y0, max_point, orig, n0, n1){
    let res = [];
    for (let i = n0; i <= n1; i++){
        let gap = Number(max_point-x0)/i.toFixed(10);
        if(generate_original(x0, y0, max_point, gap, y).slice(-1)[0].y){
            res.push({
                x: i,
                y: generate_original(x0, y0, max_point, gap, y).slice(-1)[0].y - generate_Euler(x0, y0, max_point, gap, y_prime).slice(-1)[0].y
            });
        }else{
            res.push({
                x: i,
                y: generate_original(x0, y0, max_point, gap, y).slice(-2)[0].y - generate_Euler(x0, y0, max_point, gap, y_prime).slice(-2)[0].y
            });
        }
    }
    return res;
};

// Function to calculate global error in Heun Numerical Solution for given steps
let global_heun = function (x0, y0, max_point, orig, n0, n1){
    let res = [];
    for (let i = n0; i <= n1; i++){
        let gap = Number(((max_point-x0)/i).toFixed(10));
        if (generate_original(x0, y0, max_point, gap, y).slice(-1)[0].y){
            res.push({
                x: i,
                y: generate_original(x0, y0, max_point, gap, y).slice(-1)[0].y - generate_Improved_Euler(x0, y0, max_point, gap, y_prime).slice(-1)[0].y
            });
        }else {
            res.push({
                x: i,
                y: generate_original(x0, y0, max_point, gap, y).slice(-2)[0].y - generate_Improved_Euler(x0, y0, max_point, gap, y_prime).slice(-2)[0].y
            });
        }
    }
    return res;
};

// Function to calculate global error in Runge-Kutta Numerical Solution for given steps
let global_runge_kutta = function (x0, y0, max_point, orig, n0, n1){
    let res = [];
    for (let i = n0; i <= n1; i++){
        let gap = Number(((max_point-x0)/i).toFixed(10));
        if (generate_original(x0, y0, max_point, gap, y).slice(-1)[0].y){
            res.push({
                x: i,
                y: generate_original(x0, y0, max_point, gap, y).slice(-1)[0].y - generate_Runge_Kutta(x0, y0, max_point, gap, y_prime).slice(-1)[0].y
            });
        }else {
            res.push({
                x: i,
                y: generate_original(x0, y0, max_point, gap, y).slice(-2)[0].y - generate_Runge_Kutta(x0, y0, max_point, gap, y_prime).slice(-2)[0].y
            });
        }
    }
    return res;
};