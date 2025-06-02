let searchActive = false;

function Save() {
    let ambilData = getData();
    savedata(ambilData);
    displayData();
}

function getData() {
    let name1 = document.getElementById("name").value;
    let jurusna1 = document.getElementById("jurusan").value;
    let task1 = document.getElementById("task").value;
    let description1 = document.getElementById("description").value;
    
    let array = [name1, jurusna1, task1, description1];
    return array;
}

function savedata(ambilData) {
    
    let simpanData = [];

    const storedData = localStorage.getItem('data');

    if (storedData) 
    {
        simpanData = JSON.parse(storedData);
    }
        
    const createData = {
        name: ambilData[0],
        jurusan: ambilData[1],
        task: ambilData[2],
        description: ambilData[3]
        
    }
    
    simpanData.push(createData);

    localStorage.setItem('data', JSON.stringify(simpanData));
}

function displayData(dataArray = null) {
    const tabel = document.getElementById("dataList");
    const oldTbody = tabel.querySelector("tbody");
    if(oldTbody) tabel.removeChild(oldTbody)

        const tbody = document.createElement("tbody");
        
        if(!searchActive) {
            const storedData = localStorage.getItem("data");
            dataArray = storedData ? JSON.parse(storedData): [];
        }

        dataArray.forEach((data, index) => {
            const row =document.createElement("tr");

            row.innerHTML = `
            <td>${data.name}</td>
            <td>${data.jurusan}</td>
            <td>${data.task}</td>
            <td>${data.description}</td>
            <td>
                <button onclick="deleteData(${index})">Delete</button>
                <button onclick="edit(${index})">Edit</button>  
            </td>
            `
            
        tbody.appendChild(row);
        });
        tabel.appendChild(tbody);
}
//menunggu dulu setelah selesai baru di menjalankan displayData
document.addEventListener("DOMContentLoaded", function() {
    displayData();
});

function deleteData(dataId) {    
    const isConfirmed  = confirm("Apakah anda yakin ingin mengahapus data ini!");

    if (!isConfirmed) return;

    const storedData = localStorage.getItem("data");
    const dataArray = JSON.parse(storedData);

    dataArray.splice(dataId, 1)
    localStorage.setItem("data", JSON.stringify(dataArray));
    location.reload();
}

let data= JSON.parse(localStorage.getItem('data') || "[]");

function edit(editId) {
    document.getElementById('form-title').innerText = "Form Edit Data"

    const formContainer = document.querySelector('#form');

    const item = data[editId];

    formContainer.innerHTML = `
        <input type="text" name="name" id="edit-name" value="${item.name}">
        <input type="text" name="jurusan" id="edit-jurusan" value="${item.jurusan}">
        <input type="text" name="task" id="edit-task" value="${item.task}">
        <input type="text" name="description" id="edit-description" value="${item.description}">
        <button onclick="update(${editId})">Update</button>
    `;
}

function update(editId) {
    const name = document.getElementById('edit-name').value;
    const jurusan = document.getElementById('edit-jurusan').value;
    const task = document.getElementById('edit-task').value;
    const description = document.getElementById('edit-description').value;

    data[editId] = {
        name: name,
        jurusan: jurusan,
        task: task,
        description: description,
    };

    localStorage.setItem('data', JSON.stringify(data));
    renderData();
}

function myFunction() {
    const Input = document.getElementById('myInput').value;
    searchActive = true;
    const localData = (searchInput) => {
        const filterData = data.filter(data =>
            data.name.includes(searchInput) ||
            data.jurusan.includes(searchInput) ||
            data.task.includes(searchInput) ||
            data.description.includes(searchInput)
        ); setTimeout(() => {
            if (filterData.length > 0) {
                console.log(filterData.length + ' data yang ditemukan.');
                console.log(filterData)
            }else {
                console.log(filterData.length + ' data yang ditemukan');
                console.log('Sepertinya data yang anda cari tidak tersedia');
            }
        }, 1000);
        displayData (filterData);
    }
    localData(Input);
};


function selectData() {
    const jurusanDipilih = document.getElementById('dataSelect').value;
    const data = JSON.parse(localStorage.getItem('data')) || [];

    const dataFilter = jurusanDipilih === '' ? data : data.filter(item => item.jurusan === jurusanDipilih);

    let rows = '';

    if (dataFilter.length > 0) {
        dataFilter.forEach((item, index) => {
            rows += `
            <tr>
                <td>${item.name || '-'}</td>
                <td>${(item.jurusan || '-').toUpperCase()}</td>
                <td>${item.task || '-'}</td>
                <td>${item.description || '-'}</td>
                <td>
                    <button onclick="edit(${index})" class="btn btn-sm btn-warning">Edit</button>
                    <button onclick="deleteData(${index})" class="btn btn-sm btn-danger">Delete</button>
                </td>
            </tr>
            `;
        });
    } else {
        rows = `
        <tr>
            <td colspan="5" class="text-center">Tidak ada data jurusan tersebut.</td>
        </tr>
        `;
    }

    document.querySelector('#dataList tbody').innerHTML = rows;
}
