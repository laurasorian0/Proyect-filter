const products = [
  {
    name: "Laura",
    price: 20,
    seller: "Mango",
    image: "https://st.mngbcn.com/rcs/pics/static/T6/fotos/outfit/S20/67070664_79-99999999_01.jpg?ts=1699949008925&imwidth=476&imdensity=2"
  },
  {
    name: "Alba",
    price: 25,
    seller: "Zara",
    image: "https://static.zara.net/photos///2024/V/0/1/p/4661/302/802/2/w/453/4661302802_2_1_1.jpg?ts=1701256386122"
  },
  {
    name: "Macarena",
    price: 30,
    seller: "Zara",
    image: "https://static.zara.net/photos///2023/I/0/1/p/8667/191/034/2/w/453/8667191034_1_1_1.jpg?ts=1698943021164"
  },
  {
    name: "Sonia",
    price: 15,
    seller: "Bershka",
    image: "https://static.bershka.net/4/photos2/2024/V/0/1/p/5716/623/802/6bae2fe11918e86ffbe2b84baf78e1e5-5716623802_1_3_0.jpg?imwidth=750&impolicy=bershka-itxmediumhigh&imformat=chrome"
  },
  {
    name: "Ana María",
    price: 35,
    seller: "Bershka",
    image: "https://static.bershka.net/4/photos2/2024/V/0/1/p/5716/623/600/28a1d9889a830423b2642834429ddcc0-5716623600_2_7_0.jpg?cropfixwidth=2052&imwidth=750&impolicy=bershka-crop-fix-width-itxmediumhigh&imformat=chrome"
  },
  {
    name: "Anabel",
    price: 25,
    seller: "PullandBear",
    image: "https://static.pullandbear.net/2/photos//2023/I/0/1/p/7393/347/081/7393347081_2_7_8.jpg?t=1698333660956&imwidth=750"
  },
  {
    name: "Celia",
    price: 15,
    seller: "PullandBear",
    image: "https://static.pullandbear.net/2/photos//2023/I/0/1/p/3390/300/427/3390300427_2_9_8.jpg?t=1697709073146&imwidth=750"
  },
  {
    name: "Sara",
    price: 35,
    seller: "Mango",
    image: "https://st.mngbcn.com/rcs/pics/static/T6/fotos/S20/67010468_99.jpg?ts=1698055389913&imwidth=476&imdensity=2"
  },
  {
    name: "Nicki",
    price: 45,
    seller: "Zara",
    image: "https://static.zara.net/photos///2023/I/0/1/p/9329/252/330/2/w/453/9329252330_1_1_1.jpg?ts=1699005171094"
  },
  {
    name: "Ayla",
    price: 15,
    seller: "Bershka",
    image: "https://static.bershka.net/4/photos2/2024/V/0/1/p/3462/538/800//02/3462538800_2_1_4.jpg?t=1701247005991"
  },
]
const elementosNavegacion = ["Inicio", "Productos", "Acerca de nosotros", "Contacto"];

const marcas = ["Todas", "PullandBear", "Mango", "Bershka", "Zara"]

const printNavegador = (elementos) => {
  const navegador = document.querySelector(".navegador");
  const listaUl = document.createElement("ul")
  for (const elemento of elementos) {
    const elemNav = document.createElement("li");
    elemNav.textContent = elemento;
    listaUl.appendChild(elemNav);
    navegador.append(listaUl)
  }
};

const printFormulario = () => {

  //Primer formulario (MARCA)

  const filter = document.querySelector(".filter");
  const formulario = document.createElement("form");
  const filtroLabel = document.createElement("label");
  const filtroSelect = document.createElement("select")

  for (const marca of marcas) {
    const opcionesSelect = document.createElement("option")
    opcionesSelect.innerHTML = marca
    opcionesSelect.value = marca
    filtroSelect.appendChild(opcionesSelect)
  }
  formulario.id = "filterForm"
  filtroLabel.for = "categoryFilter"
  filtroSelect.id = "categoryFilter"
  filtroLabel.innerHTML = "Filtra por marca:"

  filter.appendChild(formulario)
  formulario.appendChild(filtroLabel)
  formulario.appendChild(filtroSelect)

  // Segundo formulario (PRECIO)

  const filtroLabel2 = document.createElement("label");
  const filtroInput = document.createElement("input")

  filtroLabel2.for = "priceFilter"
  filtroLabel2.innerHTML = "Filtra por precio máximo:"
  filtroInput.type = "number"
  filtroInput.id = "priceFilter"
  filtroInput.placeholder = "Precio"

  formulario.appendChild(filtroLabel2)
  formulario.appendChild(filtroInput)


  // Botones

  const botonFiltrar = document.createElement("button")
  const botonBorrar = document.createElement("button")

  botonFiltrar.innerHTML = "Filtrar"
  botonBorrar.innerHTML = "Limpiar"
  botonFiltrar.type = "button"
  botonBorrar.type = "button"
  botonFiltrar.onclick = filterProducts
  botonBorrar.onclick = resetFilters

  formulario.appendChild(botonFiltrar)
  formulario.appendChild(botonBorrar)

}


function filterProducts() {
  const categoryFilter = document.getElementById('categoryFilter').value;
  const priceFilter = parseFloat(document.getElementById('priceFilter').value) || Infinity;

  const filteredProducts = products.filter(product => {
    const categoryMatch = categoryFilter === 'Todas' || product.seller === categoryFilter;
    const priceMatch = product.price <= priceFilter;
    return categoryMatch && priceMatch;
  });

  displayProducts(filteredProducts);
}

function resetFilters() {
  document.getElementById('categoryFilter').value = 'Todas';
  document.getElementById('priceFilter').value = '';
  displayProducts(products);
}

function displayProducts(productsToShow) {
  const productContainer = document.getElementById('productContainer');
  productContainer.innerHTML = '';

  if (productsToShow.length === 0) {
    const mensajeSinResultados = document.createElement('h2');
    mensajeSinResultados.textContent = 'No se han encontrado resultados...';
    productContainer.appendChild(mensajeSinResultados);
  } else {
    productsToShow.forEach(product => {
      const productElement = document.createElement('div');
      productElement.classList.add('product');

      // Crear elementos para la imagen, nombre y precio
      const productImage = document.createElement('img');
      productImage.src = product.image;
      productImage.alt = product.name;

      const divNombrePrecio = document.createElement("div")
      divNombrePrecio.className = "divNombrePrecio"

      const productDetails = document.createElement('div');
      productDetails.classList.add('product-details');

      const productName = document.createElement('h3');
      productName.textContent = product.name;

      const productPrice = document.createElement('p');
      productPrice.textContent = `$${product.price}`;

      // Agregar elementos al contenedor del producto
      productDetails.appendChild(productImage);
      productDetails.appendChild(divNombrePrecio)
      divNombrePrecio.appendChild(productName);
      divNombrePrecio.appendChild(productPrice);
      productElement.appendChild(productDetails);

      // Agregar el producto al contenedor principal
      productContainer.appendChild(productElement);
    });
  }
}


displayProducts(products);




printNavegador(elementosNavegacion)
printFormulario()


