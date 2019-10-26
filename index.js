let ctx1 = document.getElementById('graphs').getContext('2d');
window.myLine = new Chart(ctx1, config1);

let ctx2 = document.getElementById('comparison').getContext('2d');
window.myLine2 = new Chart(ctx2, config2);

function update_graphs(){
    config1.data.datasets[0].data = generate_original(x0, y0, max_point, gap, y);
    config1.data.datasets[1].data = generate_Euler(x0, y0, max_point, gap, y_prime);
    config1.data.datasets[2].data = generate_Improved_Euler(x0, y0, max_point, gap, y_prime);
    config1.data.datasets[3].data = generate_Runge_Kutta(x0, y0, max_point, gap, y_prime);
    config2.data.datasets[0].data = [
        config1.data.datasets[0].data[config1.data.datasets[0].data.length - 1].y - config1.data.datasets[1].data[config1.data.datasets[1].data.length - 1].y,
        config1.data.datasets[0].data[config1.data.datasets[0].data.length - 1].y - config1.data.datasets[2].data[config1.data.datasets[2].data.length - 1].y,
        config1.data.datasets[0].data[config1.data.datasets[0].data.length - 1].y - config1.data.datasets[3].data[config1.data.datasets[3].data.length - 1].y
    ];
    console.log(config1.data.datasets[0].data);
    window.myLine.update();
    window.myLine2.update();
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

let theme = 'dark';
let change_theme = document.getElementById('change_theme').onclick = function () {
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
