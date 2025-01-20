const fetchProducts = async() => {
    try {
        const response = await fetch ('http://localhost:3000/products')
        const products = await response.json()
        getProducts(products)
        console.log(products)
    } catch (error) {
        console.log(error)
    }
}
const getProducts = (products) => {
    const displayProducts = document.getElementById('all-products')
    let output = ''
    products.forEach(({name,image, price}) => {
        output += `
            <div class="container">
                <div class="products">
                    <img src="${image}" alt="${name}">
                    <h3>${name}</h3>
                    <p>${price}</p>
                </div>
            </div>
        `
    })
    displayProducts.innerHTML = output
}
fetchProducts()
