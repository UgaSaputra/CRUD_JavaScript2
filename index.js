
function Save() {
    let ambilData = getData();
    savedata(ambilData);
    displayData();
}

function getData() {
    let name1 = document.getElementById("name").value;
    let task1 = document.getElementById("task").value;
    let description1 = document.getElementById("description").value;
    
    let array = [name1, task1, description1];
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
        task: ambilData[1],
        description: ambilData[2]
        
    }
    
    simpanData.push(createData);

    localStorage.setItem('data', JSON.stringify(simpanData));
}

function displayData() {
    const tabel = document.getElementById("dataList");

    const oldTbody = tabel.querySelector("tbody");
    if(oldTbody) tabel.removeChild(oldTbody)

    const tbody = document.createElement("tbody");
    const storedData = localStorage.getItem("data");

    if(storedData) {
        const dataArray = JSON.parse(storedData);

        dataArray.forEach((data, index) => {
            const row =document.createElement("tr");

            row.innerHTML = `
            <td>${data.name}</td>
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
}
//menunggu dulu setelah selesai baru di menjalankan displayData
document.addEventListener("DOMContentLoaded", function() {
    displayData();
});

function deleteData(dataId) {    
    // localStorage.removeItem(data);
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
        <input type="text" name="task" id="edit-task" value="${item.task}">
        <input type="text" name="description" id="edit-description" value="${item.description}">
        <button onclick="update(${editId})">Update</button>
    `;
}

function update(editId) {
    const name = document.getElementById('edit-name').value;
    const task = document.getElementById('edit-task').value;
    const description = document.getElementById('edit-description').value;

    data[editId] = {
        name: name,
        task: task,
        description: description,
    };

    localStorage.setItem('data', JSON.stringify(data));
    renderData();
}