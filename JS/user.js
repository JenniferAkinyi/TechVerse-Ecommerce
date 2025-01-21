let cart = [];

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
            console.log('Button clicked');
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
    cart.forEach(({name, price, quantity}) => {
        output += `
            <div class="cart-item">
                <h4>${name}</h4>
                <p>${price}</p>
                <p>${quantity}</p> 
                <ion-icon name="close-circle-outline" class="delete-button"></ion-icon>
            </div>
        `;
    });
    addedToCart.innerHTML = output;
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    document.getElementById('total').innerText = total.toFixed(2);
    updateCartOnServer();
}

async function updateCartOnServer() {
    try {
        const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
        if (!loggedInUser) {
            throw new Error('No logged-in user found');
        }

        const response = await fetch('http://localhost:3000/cart');
        const carts = await response.json();
        const userCart = carts.find(cart => cart.userId === loggedInUser.id);

        if (userCart) {
            const updateResponse = await fetch(`http://localhost:3000/cart/${userCart.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: userCart.id,
                    userId: loggedInUser.id,
                    products: cart,
                }),
            });
            if (!updateResponse.ok) {
                throw new Error('Failed to update cart on server');
            }
            console.log('Cart updated on server');
        } else {
            const createResponse = await fetch('http://localhost:3000/cart', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userId: loggedInUser.id,
                    products: cart,
                }),
            });
            if (!createResponse.ok) {
                throw new Error('Failed to create cart on server');
            }
            console.log('Cart created on server');
        }
    } catch (error) {
        console.error('Error updating cart on server:', error);
    }
}

fetchProducts();
