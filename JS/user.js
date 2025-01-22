let cart = [];

function loadCart() {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
        cart = JSON.parse(storedCart);
    }
}
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}


const fetchProducts = async () => {
    try {
        const response = await fetch('http://localhost:3000/products');
        const products = await response.json();
        getProducts(products);
        console.log(products);
    } catch (error) {
        console.log(error);
    }
};

const getProducts = (products) => {
    const displayProducts = document.getElementById('all-products');
    let output = '';
    products.forEach(({id, name, image, price}) => {
        output += `
            <div class="container">
                <div class="products">
                    <img src="${image}" alt="${name}" loading="lazy">
                    <h3>${name}</h3>
                    <p>${price}</p>
                    <button type="button" class="add-to-cart" product-id="${id}" product-name="${name}" product-price="${price}">Add to Cart</button>
                </div>
            </div>
        `;
    });
    displayProducts.innerHTML = output;

    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault(); 
            const id = button.getAttribute('product-id');
            const name = button.getAttribute('product-name');
            const price = parseFloat(button.getAttribute('product-price'));

            addToCart({id, name, price, quantity: 1});
        });
    });
};

function addToCart(product) {
    const existingProduct = cart.find(item => item.id === product.id);

    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        cart.push(product);
    }
    console.log(cart);
    updateCart();
}

function updateCart() {
    const addedToCart = document.getElementById('cart-items');
    let output = '';
    cart.forEach(({id, name, price, quantity}) => {
        output += `
            <div class="cart-item">
                <h4>${name}</h4>
                <p>${price}</p>
                <ion-icon name="remove-outline" class="remove-product" product-id="${id}" product-quantity="${quantity}"></ion-icon>
                <p>${quantity}</p> 
                <ion-icon name="add-outline" class="add-product" product-id="${id}" product-quantity="${quantity}"></ion-icon>
                <ion-icon name="close-circle-outline" class="delete-button" product-id="${id}" product-name="${name}" product-price="${price}" product-quantity="${quantity}"></ion-icon>
            </div>
        `;
    });
    addedToCart.innerHTML = output;
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    document.getElementById('total').innerText = total.toFixed(2);
    removeProduct();
    addCartProduct();
    removeCartProduct();
    saveCart();
}
function removeProduct() {
    const deleteButtons = document.querySelectorAll('.delete-button');
    deleteButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const id = button.getAttribute('product-id');
            cart = cart.filter(item => item.id !== id);
            updateCart();
        });
    });
}
function addCartProduct() {
    const addButtons = document.querySelectorAll('.add-product');
    addButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const id = button.getAttribute('product-id');
            const product = cart.find(item => item.id === id);
            product.quantity += 1;
            updateCart();
        });
    });
}
function removeCartProduct() {
    const removeButtons = document.querySelectorAll('.remove-product');
    removeButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const id = button.getAttribute('product-id');
            const product = cart.find(item => item.id === id);
            if (product.quantity > 1) {
                product.quantity -= 1;
            } else {
                cart = cart.filter(item => item.id !== id);
            }
            updateCart();
        });
    });
}
function checkout() {
    const checkoutButton = document.getElementById('checkout');
    checkoutButton.addEventListener('click', () => {
        if (cart.length === 0) {
            alert('Your cart is empty. Please add items to the cart before checking out.');
            return;
        }
            alert('Checkout successful! Thank you for your purchase.');
            cart = [];
            updateCart();
    }, {once: true});
}

loadCart();
fetchProducts();
checkout()
