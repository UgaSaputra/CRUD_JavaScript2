function Submit() {
    let dataEntered = getData(); // ambil data dari form
    let readData = readingDataFromLocalStorage(dataEntered); // ambil kembali data dari localstorage
    // insert(readData); //masukan data ke dalam table
}

//mengambil data dari form input
function getData() {
    let name1 = document.getElementById("name").value;
    let task = document.getElementById("task").value;
    let description =  document.getElementById("description").value

    let Array = [name1, task, description]; //menyimpan ke 3 data ke dalam array
    return Array;//mengembalikan array agar bisa digunakan
}

//menerima dan mengirim data
function readingDataFromLocalStorage(dataEntered) {
    // Ambil data dari localStorage (kalau ada)
    // const storedUserData = localStorage.getItem('users');
    let userData = [];

    // if (storedUserData) {
    //     userData = JSON.parse(storedUserData);
    // }

    // Buat objek baru berdasarkan data yang dimasukkan
    const inputUser = {
        name: dataEntered[0],
        task: dataEntered[1],
        description: dataEntered[2]
    };

    // Tambahkan data baru ke array yang sudah ada
    userData.push(inputUser);

    // Simpan kembali array yang sudah diperbarui ke localStorage
    localStorage.setItem("users", JSON.stringify(userData));
}


// //menampilkan data ke view table
// function insert(readData) {
//     let row = tabel.insertRow();
//     let cell1 = row.insertCell(0);
//     let cell2 = row.insertCell(1);
//     let cell3 = row.insertCell(2);

//     cell1.innerHTML = readData[0];
//     cell2.innerHTML = readData[1];
//     cell3.innerHTML = readData[2];

// }


