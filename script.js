const staff = [
    {
        "id": 1,
        "name": "Alex Rosetta",
        "email": "alexyrosetta@egmail.com",
        "image": "./assets/staff-1.png",
    },
    {
        "id": 2,
        "name": "Maria July",
        "email": "mariajuly@egmail.com",
        "image": "./assets/staff-2.png",
    }
];

const services = [
    {
        "id": 1,
        "name": "Oral hygiene",
        "image": "./assets/service-1.png",
        "duration": "1 hour",
        "price": 50.00,
    },
    {
        "id": 2,
        "name": "Implants",
        "image": "./assets/service-2.png",
        "duration": "1 hour 30 minutes",
        "price": 120.00,
    },
    {
        "id": 3,
        "name": "Check up",
        "image": "./assets/service-3.png",
        "duration": "1 hour 12 minutes",
        "price": 140.00,
    }
]

const dates = ["2022-03-04", "2022-03-05", "2022-03-06",];

const times = [
    {
        "start_time": "09:00",
        "end_time": "09:30"
    },
    {
        "start_time": "09:30",
        "end_time": "10:00"
    },
    {
        "start_time": "10:00",
        "end_time": "10:30"
    }
];

let currentStage = 0;
let selectedData = {
    staff_id: null,
    service_id: null, 
    customer: {
        name: '',
        surname: '',
        email: '',
        phone: ''
    }
};
const backBtn = document.querySelector('#back');
const nextBtn = document.querySelector('#next');
const errorBtn = document.querySelector('#error');
const staffCards = document.querySelectorAll('.staffCard');

const reservationContainer = document.querySelector('.reservation-container');
const h1 = document.querySelector('h1');

function renderStage() {

    // Clear previous content
    const selectedStaffId = sessionStorage.getItem('selectedStaffId');
    const selectedServiceId = sessionStorage.getItem('selectedServiceId');

    if (currentStage === 0) {
        reservationContainer.innerHTML =
            (staff.map(staf => {
                return `<div class='staffCard ${selectedStaffId == staf.id ? 'selected' : ''}'  onClick={staffHandler(${staf.id})}  data-id=${staf.id}  >` +
                    `<img src=${staf.image}  class='staffImg'/>` +
                    `<div class='staffDescription' >` +
                    `<p class='staffName' >` + staf.name + '</p>' +
                    `<p class='staffEmail' >` + staf.email + '</p>' +
                    `</div>` +
                    '</div>'
            })).join(' ');
        h1.innerHTML = 'Select staff';
        errorBtn.style.backgroundColor = '#F4BE6C';
        errorBtn.style.display= 'none';
        backBtn.classList.add('d-none')
        document.querySelector('#staff').classList.add('active')


    } else if (currentStage === 1) {
        reservationContainer.innerHTML =
            (services.map(service => {
                return (
                    `<div class='staffCard ${selectedServiceId == service.id ? 'selected' : ''} ' onClick={serviceHandler(${service.id})} >` +
                    `<img src=${service.image}  class='staffImg' />` +
                    `<div style='display:flex; width:100%; justify-content: space-between; justify-items: center;'>` +
                    `<div class='staffDescription' >` +
                    `<p class='staffName' >` + service.name + '</p>' +
                    `<p class='staffEmail' >` + service.duration + '</p>' +
                    `</div>` +
                    `<p class='servicePrice'>` + service.price + '$' + `</p>` +
                    `</div>` +
                    '</div>')
            })).join(' ');
        h1.innerHTML = 'Select service ';
        errorBtn.classList.remove('dBlock')

        backBtn.classList.remove('d-none')
        document.querySelector('#staff').classList.remove('active')
        document.querySelector('#staff').style.color = 'white'
        document.querySelector('#service').classList.add('active')


    } else if (currentStage === 2) {
        reservationContainer.innerHTML =
            '<form>' +
            `<div class='col'>` +
            '<label for="firstName">' + 'First Name' + '</label>' +
            `<input type="text" id="firstName" name="firstName">` +
            '</div>' +
            `<div class='col'>` +
            `<label for="lastName">Last Name</label>` +
            `<input type="text" id="lastName" name="lastName">` +
            `</div>
                        <div class="col">
                            <label for="email">E-mail</label>
                            <input type="text" id="email" name="email">
                        </div>
                        <div class="col">
                            <label for="phone">Phone</label>
                            <input type="text" id="phone" name="phone">
                        </div>` +
            '</form>' +
            `<div class="textarea">` +
            `<label for="note">Note</label>` +
            `<div name=""  id="note" >` +
            `<p>Staff: <span id="staffName"></span> </p>
                        <p>Service: <span id="serviceName"></span> </p> 
                        <p>Price:  <span id="servicePrice"></span></p>` +
            `</div>` +
            '</div>'

        h1.innerHTML = 'Confirm detailes'
        errorBtn.classList.remove('dBlock')

        document.querySelector('#service').style.color = 'white'
        document.querySelector('#service').classList.remove('active')
        document.querySelector('#confirmation').classList.add('active')

        document.querySelector('#firstName').addEventListener('input', function(event) {
            selectedData.customer.name = event.target.value;
            // console.log(selectedData.customer)
        });
        
        document.querySelector('#lastName').addEventListener('input', function(event) {
            selectedData.customer.surname = event.target.value;
            // console.log(selectedData.customer)
        });
        document.querySelector('#email').addEventListener('input', function(event) {
            selectedData.customer.email = event.target.value;
            // console.log(selectedData.customer)
        }); document.querySelector('#phone').addEventListener('input', function(event) {
            selectedData.customer.phone = event.target.value;
            // console.log(selectedData.customer)
        });
    }
    // console.log(reservationContainer.innerHTML)
}

renderStage();

function staffHandler(staffId) {
    selectedData.staff_id = staff.find(item => item.id === staffId);
    currentStage++;
    renderStage();
    sessionStorage.setItem('selectedStaffId', staffId)

    // console.log(currentStage)
}

function serviceHandler(serviceId) {
    selectedData.service_id = services.find(item => item.id === serviceId);

    sessionStorage.setItem('selectedServiceId', serviceId);

    // console.log(serviceId)
    currentStage++;
    renderStage();

    console.log(selectedData)
    // console.log(currentStage)

    document.querySelector('#staffName').innerHTML = `${selectedData.staff_id.name}`;
    document.querySelector('#serviceName').innerHTML = `${selectedData.service_id.name}`;
    document.querySelector('#servicePrice').innerHTML = `$${selectedData.service_id.price}`;


}




const goBack = () => {
    currentStage--;
    renderStage();

}

const handleNext = () => {
    if (currentStage === 0 && !selectedData.staff_id) {
        errorBtn.classList.add('dBlock')
        return;
    } else if (currentStage === 1 && !selectedData.service_id) {
        errorBtn.classList.add('dBlock')
        errorBtn.innerHTML = 'Select Service'
        return
    }
    else if (currentStage === 2 && (!selectedData.customer.email || !selectedData.customer.name || !selectedData.customer.phone || !selectedData.customer.surname)) {
        errorBtn.classList.add('dBlock')
        errorBtn.innerHTML = 'Select Customer'
        return
    }
    else if (currentStage === 2 && selectedData.customer.email && selectedData.customer.name && selectedData.customer.phone && selectedData.customer.surname) {
       
         
        errorBtn.innerHTML = 'Confirmation successfully completed!'
        errorBtn.style.backgroundColor = 'green'
        selectedData.service_id = null
        selectedData.staff_id = null
        selectedData.customer.email = null
        selectedData.customer.name = null
        selectedData.customer.surname = null
        selectedData.customer.phone = null
        currentStage = 0 
        
        sessionStorage.clear();
        renderStage();

        return
    }
    else {
        currentStage++
        renderStage();
    }

}

backBtn.addEventListener('click', goBack);
nextBtn.addEventListener('click', handleNext);


window.onload = () => {
    sessionStorage.clear();
    renderStage();
}