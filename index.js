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
