let products = JSON.parse(localStorage.getItem("products")) || [];

// Load awal
window.onload = function () {
    loadProducts();
    const user = localStorage.getItem("user");
    if (user) {
        showDashboard(user);
    }
};

function login() {
    const username = document.getElementById("username").value;
    if (username) {
        localStorage.setItem("user", username);
        showDashboard(username);
    } else {
        alert("Masukkan nama pengguna");
    }
}

function showDashboard(user) {
    document.getElementById("loginBox").classList.add("hidden");
    document.getElementById("dashboard").classList.remove("hidden");
    document.getElementById("userName").innerText = user;
}

function logout() {
    localStorage.removeItem("user");
    location.reload();
}

function addProduct() {
    const name = document.getElementById("productName").value;
    const price = document.getElementById("productPrice").value;
    const address = document.getElementById("productAddress").value;
    const image = document.getElementById("productImage").files[0];

    if (!name || !price || !address || !image) {
        alert("Lengkapi data produk");
        return;
    }

    const reader = new FileReader();
    reader.onload = function () {
        const product = {
            name,
            price,
            address,
            image: reader.result
        };

        products.push(product);
        localStorage.setItem("products", JSON.stringify(products));
        loadProducts();
    };

    reader.readAsDataURL(image);
}

function loadProducts() {
    const list = document.getElementById("productList");
    list.innerHTML = "";

    products.forEach(p => {
        list.innerHTML += `
            <div class="product">
                <img src="${p.image}">
                <strong>${p.name}</strong><br>
                Harga: Rp ${p.price}<br>
                Alamat: ${p.address}
            </div>
        `;
    });
}
