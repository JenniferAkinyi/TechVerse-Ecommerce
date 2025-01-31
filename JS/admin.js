document.addEventListener("DOMContentLoaded", () => {
  const messageElement = document.getElementById("message");

  const displayMessage = (message, isError = false) => {
    messageElement.textContent = message;
    messageElement.style.display = "block";
    messageElement.style.color = isError ? "red" : "green";
  };

  const fetchProducts = async () => {
    try {
      const response = await fetch("http://localhost:3000/products");
      const products = await response.json();
      getProducts(products);
      console.log(products);
    } catch (error) {
      console.log(error);
    }
  };

  const getProducts = (products) => {
    const displayProducts = document.getElementById("all-products");
    let output = "";
    products.forEach(({ id, name, image, price, description }) => {
      output += `
            <div class="container">
                <div class="products">
                    <img src="${image}" alt="${name}" loading="lazy">
                    <h3>${name}</h3>
                    <p>${price}</p>
                    <div class="admin-actions">
                        <button class="edit" 
                                data-id="${id}" 
                                data-name="${name}" 
                                data-imageurl="${image}" 
                                data-price="${price}" 
                                data-description="${description}" >Edit
                        </button>
                        <button type="button" class="delete" data-id="${id}">Delete</button>
                    </div>
                </div>
            </div>
        `;
    });
    displayProducts.innerHTML = output;
    const deleteButtons = document.querySelectorAll(".delete");
    deleteButtons.forEach((button) => {
      button.addEventListener("click", (event) => {
        const itemId = event.target.dataset.id;
        showDeleteConfirmation(itemId);
      });
    });
  };

  const deleteConfirmationPopup = document.querySelector(
    "#delete-confirmation-popup"
  );
  const confirmDeleteButton = document.querySelector("#confirm-delete");
  const cancelDeleteButton = document.querySelector("#cancel-delete");
  let deleteItemId = null;

  const showDeleteConfirmation = (itemId) => {
    deleteItemId = itemId;
    deleteConfirmationPopup.style.display = "flex";
  };

  confirmDeleteButton.onclick = () => {
    if (deleteItemId) {
      deleteItem(deleteItemId);
      deleteConfirmationPopup.style.display = "none";
      deleteItemId = null;
    }
  };

  cancelDeleteButton.onclick = () => {
    deleteConfirmationPopup.style.display = "none";
    deleteItemId = null;
  };

  const deleteItem = async (itemId) => {
    try {
      const response = await fetch(`http://localhost:3000/products/${itemId}`, {
        method: "DELETE",
      });
      if (response.ok) {
        console.log(`Product with ID ${itemId} deleted successfully.`);
        fetchProducts();
      } else {
        console.error(`Failed to delete product with ID ${itemId}.`);
      }
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const popupForm = document.querySelector("#popup-form");
  const addProductButton = document.querySelector("#add-product");
  addProductButton.addEventListener("click", () => {
    popupForm.style.display = "flex";
  });

  const closeAddProductPopup = document.getElementById("close-popup");
  closeAddProductPopup.addEventListener("click", () => {
    popupForm.style.display = "none";
  });

  const productForm = document.getElementById("dataForm");
  productForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const name = document.getElementById("name").value;
    const description = document.getElementById("description").value;
    const image = document.getElementById("imageUrl").value;
    const price = document.getElementById("price").value;

    if (!name || !description || !image || !price) {
      displayMessage("Please fill in all the details", true);
      return;
    }

    const product = { name, description, image, price };
    await createProduct(product);
    productForm.reset();
    document.getElementById("popup-form").style.display = "none";
  });

  const createProduct = async (product) => {
    try {
      const response = await fetch("http://localhost:3000/products");
      const products = await response.json();
      const existingProduct = products.find((p) => p.name === product.name);

      if (existingProduct) {
        displayMessage("Product already exists", true);
        return;
      }

      const createResponse = await fetch("http://localhost:3000/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
      });

      if (createResponse.ok) {
        const newProduct = await createResponse.json();
        console.log("The product has been created", newProduct);
        displayMessage("Product added successfully");
        fetchProducts();
      } else {
        displayMessage("Failed to add product", true);
      }
    } catch (error) {
      console.log(error);
      displayMessage("Failed to add product", true);
    }
  };

  fetchProducts();
});
