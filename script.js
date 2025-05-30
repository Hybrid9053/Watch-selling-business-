function startApp() {
  const name = document.getElementById("nameInput").value;
  if (name.trim()) {
    localStorage.setItem("username", name);
    document.getElementById("greeting").textContent = "Welcome, " + name;
    document.getElementById("nameSection").style.display = "none";
    document.getElementById("appSection").style.display = "block";
    loadSales();
  }
}

function getToday() {
  return new Date().toISOString().split("T")[0];
}

function addSale() {
  const product = document.getElementById("productInput").value;
  const price = parseInt(document.getElementById("priceInput").value);
  const image = document.getElementById("imageInput").value;
  const date = getToday();

  if (!product || !price) {
    alert("Please fill in product name and price");
    return;
  }

  const sale = { product, price, image, date };
  const data = JSON.parse(localStorage.getItem("sales") || "[]");
  data.push(sale);
  localStorage.setItem("sales", JSON.stringify(data));
  loadSales();
}

function loadSales() {
  const list = document.getElementById("salesList");
  const totalDisplay = document.getElementById("totalSales");
  const today = getToday();
  const data = JSON.parse(localStorage.getItem("sales") || "[]");
  const todaySales = data.filter(sale => sale.date === today);

  list.innerHTML = "";
  let total = 0;
  todaySales.forEach(sale => {
    const item = document.createElement("li");
    const imgSrc = sale.image ? sale.image : "https://via.placeholder.com/80";
    item.innerHTML = `
      <img src="${imgSrc}" class="watch-img" />
      <div>
        <strong>${sale.product}</strong><br />
        ${sale.price} TZS
      </div>
    `;
    list.appendChild(item);
    total += sale.price;
  });

  totalDisplay.textContent = total;
}

// Auto load app if name exists
if (localStorage.getItem("username")) {
  document.getElementById("greeting").textContent = "Welcome, " + localStorage.getItem("username");
  document.getElementById("nameSection").style.display = "none";
  document.getElementById("appSection").style.display = "block";
  loadSales();
}
