
const btn = document.getElementById('calculate');

    btn.addEventListener('click', function () {
        let weight = document.getElementById('weightInput').value;
        let height = document.getElementById('heightInput').value;

        if (height == '' || weight == '') {
            alert('Please fill out the input fields');
            return;
        }

        // bmi = weight in KG / (height in m * height in m)
        height = height / 100;

        let bmi = weight / (height * height);

        console.log(bmi);

        bmi = bmi.toFixed(2);

        document.querySelector('#bmiresult').innerHTML = bmi;

        let status = '';

        if (bmi < 18.5) {
            status = "underweight";
        } else if (bmi >= 18.5 && bmi < 25) {
            status = "normal weight";
        } else {
            status = "overweight";
        }

        document.querySelector('.comment').innerHTML = `You are ${status}`;
    });
