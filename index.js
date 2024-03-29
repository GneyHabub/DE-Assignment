let ctx1 = document.getElementById('graphs').getContext('2d');
window.myLine = new Chart(ctx1, config1);

let ctx2 = document.getElementById("comparison").getContext('2d');
window.myLine2 = new Chart(ctx2, config2);

let ctx3 = document.getElementById('local_error').getContext('2d');
window.myLine3 = new Chart(ctx3, config3);

function update_graphs(){
    orig = config1.data.datasets[0].data = generate_original(x0, y0, max_point, gap, y);
    euler = config1.data.datasets[1].data = generate_Euler(x0, y0, max_point, gap, y_prime);
    heun = config1.data.datasets[2].data = generate_Improved_Euler(x0, y0, max_point, gap, y_prime);
    runge_kutta = config1.data.datasets[3].data = generate_Runge_Kutta(x0, y0, max_point, gap, y_prime);

    config2.data.datasets[0].data = local_euler(x0, y0, max_point, gap, y_prime, orig);
    config2.data.datasets[1].data = local_heun(x0, y0, max_point, gap, y_prime, orig);
    config2.data.datasets[2].data = local_runge_kutta(x0, y0, max_point, gap, y_prime, orig);

    config3.data.datasets[0].data = global_euler(x0, y0, max_point, orig, n0, n1);
    config3.data.datasets[1].data = global_heun(x0, y0, max_point, orig, n0, n1);
    config3.data.datasets[2].data = global_runge_kutta(x0, y0, max_point, orig, n0, n1);

    window.myLine.update();
    window.myLine2.update();
    window.myLine3.update();
}

let set_gap = document.getElementById('change_gap').addEventListener('click', function () {
    if (parseFloat(document.getElementById('gap').value) > 0 && parseFloat(document.getElementById('gap').value) <= max_point/2){
        gap = parseFloat(document.getElementById('gap').value);
        update_graphs();
    }else {
        alert("WRONG NUMBER");
    }
    document.getElementById('gap').value = gap;
});

let set_max_point = document.getElementById('change_max_point').addEventListener('click', function () {
    if (parseFloat(document.getElementById('max_point').value) > 0 && parseFloat(document.getElementById('max_point').value) <= 100){
        max_point = parseFloat(document.getElementById('max_point').value);
        update_graphs();
    }else {
        alert("WRONG NUMBER");
    }
    document.getElementById('max_point').value = max_point;
});

let set_x0 = document.getElementById('change_x0').addEventListener('click', function () {
    if (parseFloat(document.getElementById('x0').value) > 0 && parseFloat(document.getElementById('x0').value) < max_point){
        x0 = parseFloat(document.getElementById('x0').value);
        update_graphs();
    }else {
        alert("WRONG NUMBER");
    }
    document.getElementById('x0').value = x0;
});

let set_y0 = document.getElementById('change_y0').addEventListener('click', function () {

    if (parseFloat(document.getElementById('y0').value) > 0){
        y0 = parseFloat(document.getElementById('y0').value);
        update_graphs();
    }else {
        alert("WRONG NUMBER");
    }
    document.getElementById('y0').value = y0;
});

let set_n0 = document.getElementById('change_n0').addEventListener('click', function () {

    if (parseFloat(document.getElementById('n0_value').value) > 0){
        n0 = parseFloat(document.getElementById('n0_value').value);
        update_graphs();
    }else {
        alert("WRONG NUMBER");
    }
});

let set_n1 = document.getElementById('change_n1').addEventListener('click', function () {

    if (parseFloat(document.getElementById('n1_value').value) > 0){
        n1 = parseFloat(document.getElementById('n1_value').value);
        update_graphs();
    }else {
        alert("WRONG NUMBER");
    }
});

let theme = 'dark';
let change_theme = document.getElementById('change_theme').onclick = function () {
    if (theme === 'dark'){
        theme = 'light';
        document.getElementById('theme').href = "https://cdn.jsdelivr.net/gh/kognise/water.css@latest/dist/light.min.css";
        document.getElementById('change_theme').src = 'img/sun.png';
        config1.data.datasets[0].borderColor = '#000';
        config1.data.datasets[1].borderColor = config2.data.datasets[0].borderColor = config3.data.datasets[0].borderColor = '#e80301';
        config1.data.datasets[2].borderColor = config2.data.datasets[1].borderColor = config3.data.datasets[1].borderColor = '#0ce11e';
        config1.data.datasets[3].borderColor = config2.data.datasets[2].borderColor = config3.data.datasets[2].borderColor = '#efd100';
        update_graphs();
    }else if (theme === 'light'){
        theme = 'dark';
        document.getElementById('theme').href = "https://cdn.jsdelivr.net/gh/kognise/water.css@latest/dist/dark.min.css";
        document.getElementById('change_theme').src = 'img/moon.png';
        config1.data.datasets[0].borderColor = '#fff';
        config1.data.datasets[1].borderColor = config2.data.datasets[0].borderColor = config3.data.datasets[0].borderColor = '#17fcfe';
        config1.data.datasets[2].borderColor = config2.data.datasets[1].borderColor = config3.data.datasets[1].borderColor = '#f31ee1';
        config1.data.datasets[3].borderColor = config2.data.datasets[2].borderColor = config3.data.datasets[2].borderColor = '#7210d3';
        update_graphs();
    }else {
        alert("OOOOPS, SOMETHING WENT WRONG!");
    }
};
