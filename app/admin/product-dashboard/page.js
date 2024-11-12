"use client";

import React, { useEffect, useState } from "react";
import styles from "./page.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faPlusCircle,
    faPenSquare,
    faTrashAlt,
    faBox,
    faCloudUploadAlt,
    faDollarSign,
    faWeightHanging,
    faTag,
    faClipboardList,
} from "@fortawesome/free-solid-svg-icons";

export default function ProductDashboard() {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(null);
    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [isUpdateOpen, setIsUpdateOpen] = useState(false);
    const [isImageUploadOpen, setIsImageUploadOpen] = useState(false);
    const [newProduct, setNewProduct] = useState({
        productName: "",
        description: "",
        quantity: 0,
        price: 0.0,
        category: "",
        ingredients: "",
    });
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [selectedProductForImage, setSelectedProductForImage] = useState(null);
    const [imageURL, setImageURL] = useState("");
    const [imageURLMap, setImageURLMap] = useState({});

    useEffect(() => {
        async function fetchProducts() {
            try {
                const response = await fetch("http://localhost:8080/product", {
                    credentials: "include",
                });
                if (!response.ok) {
                    throw new Error("Failed to fetch products");
                }
                const data = await response.json();
                setProducts(data);
            } catch (err) {
                setError(err.message);
            }
        }

        fetchProducts();
    }, []);

    const handleCreate = async () => {
        try {
            const response = await fetch("http://localhost:8080/admin/product/create", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({
                    ...newProduct,
                    ingredients: newProduct.ingredients.split(",").map((name) => name.trim()), // Convert to an array of strings
                }),
            });
            if (response.ok) {
                const createdProduct = await response.json();
                setProducts([...products, createdProduct]);
                setNewProduct({
                    productName: "",
                    description: "",
                    quantity: 0,
                    price: 0.0,
                    category: "",
                    ingredients: "",
                });
                setIsCreateOpen(false);
            } else {
                throw new Error("Failed to create product");
            }
        } catch (err) {
            setError(err.message);
        }
    };

    const handleUpdate = async () => {
        if (!selectedProduct) {
            setError("No product selected for update");
            return;
        }

        try {
            const response = await fetch(
                `http://localhost:8080/admin/product/${selectedProduct.id}/update`,
                {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    credentials: "include",
                    body: JSON.stringify({
                        productName: selectedProduct.productName,
                        description: selectedProduct.description,
                        quantity: selectedProduct.quantity,
                        price: selectedProduct.price,
                        category: selectedProduct.category,
                        ingredients: selectedProduct.ingredients.split(",").map((name) => name.trim()), // Convert to an array of strings
                    }),
                }
            );

            if (!response.ok) {
                throw new Error("Failed to update product");
            }

            const updatedProduct = await response.json();
            setProducts(
                products.map((product) =>
                    product.id === selectedProduct.id ? updatedProduct : product
                )
            );
            setSelectedProduct(null);
            setIsUpdateOpen(false);
        } catch (err) {
            setError(err.message);
        }
    };

    const handleDelete = async (productId) => {
        try {
            const response = await fetch(
                `http://localhost:8080/admin/product/${productId}/delete`,
                {
                    method: "DELETE",
                    credentials: "include",
                }
            );
            if (response.ok) {
                setProducts(products.filter((product) => product.id !== productId));
            } else {
                throw new Error("Failed to delete product");
            }
        } catch (err) {
            setError(err.message);
        }
    };

    const handleImageUpload = async () => {
        try {
            const response = await fetch(
                `http://localhost:8080/admin/product/${selectedProductForImage.id}/upload-image`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    credentials: "include",
                    body: JSON.stringify({ url: imageURL }),
                }
            );
            if (response.ok) {
                setProducts((prevProducts) =>
                    prevProducts.map((product) =>
                        product.id === selectedProductForImage.id
                            ? { ...product, url: imageURL }
                            : product
                    )
                );
                setIsImageUploadOpen(false);
                setImageURL("");
                alert("Image uploaded successfully!");
            } else {
                throw new Error("Failed to upload image");
            }
        } catch (err) {
            setError(err.message);
        }
    };

    const containerStyle = {
        padding:
            products.length < 3 ? "40px" : products.length < 6 ? "30px" : "20px",
    };

    return (
        <div className={styles.container} style={containerStyle}>
            <h1 className={styles.title}>Product Dashboard</h1>
            {error && <p className={styles.error}>{error}</p>}

            <div className={styles.actions}>
                <button className={styles.createButton} onClick={() => setIsCreateOpen(true)}>
                    <FontAwesomeIcon icon={faPlusCircle} /> Add Product
                </button>
            </div>

            <div className={styles.productsGrid}>
                {products.map((product) => (
                    <div key={product.id} className={styles.productCard}>
                        <h2 className={styles.productName}>
                            <FontAwesomeIcon icon={faBox} /> {product.productName}
                        </h2>
                        {product.url && product.url !== "nan" ? (
                            <>
                                <img src={product.url} alt={product.productName} className={styles.productImage} />
                                <button
                                    className={styles.uploadNewImageButton}
                                    onClick={() => {
                                        setSelectedProductForImage(product);
                                        setIsImageUploadOpen(true);
                                    }}
                                >
                                    Change Image
                                </button>
                            </>
                        ) : (
                            <div className={styles.imageUpload}>
                                your image here
                                <button
                                    className={styles.uploadButton}
                                    onClick={() => {
                                        setSelectedProductForImage(product);
                                        setIsImageUploadOpen(true);
                                    }}
                                >
                                    <FontAwesomeIcon icon={faCloudUploadAlt} /> Upload Image
                                </button>
                            </div>
                        )}
                        <p className={styles.productDetail}>
                            <FontAwesomeIcon icon={faClipboardList} /> <strong>ID:</strong> {product.id}
                        </p>
                        <p className={styles.productDetail}>
                            <FontAwesomeIcon icon={faClipboardList} /> <strong>Description:</strong> {product.description}
                        </p>
                        <p className={styles.productDetail}>
                            <FontAwesomeIcon icon={faWeightHanging} /> <strong>Quantity:</strong> {product.quantity}
                        </p>
                        <p className={styles.productDetail}>
                            <FontAwesomeIcon icon={faDollarSign} /> <strong>Price:</strong> ${product.price.toFixed(2)}
                        </p>
                        <p className={styles.productDetail}>
                            <FontAwesomeIcon icon={faTag} /> <strong>Category:</strong> {product.category}
                        </p>
                        <p className={styles.productDetail}>
                            <FontAwesomeIcon icon={faClipboardList} /> <strong>Ingredients:</strong>{" "}
                            {product.ingredients.map((ingredient) => ingredient.name).join(", ")}
                        </p>
                        <div className={styles.productActions}>
                            <button
                                className={styles.updateButton}
                                onClick={() => {
                                    setSelectedProduct({
                                        ...product,
                                        ingredients: product.ingredients.map((ingredient) => ingredient.name).join(", "),
                                    });
                                    setIsUpdateOpen(true);
                                }}
                            >
                                <FontAwesomeIcon icon={faPenSquare} /> Edit
                            </button>
                            <button
                                className={styles.deleteButton}
                                onClick={() => handleDelete(product.id)}
                            >
                                <FontAwesomeIcon icon={faTrashAlt} /> Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {isCreateOpen && (
                <div className={styles.modal}>
                    <div className={styles.modalContent}>
                        <h2>Create Product</h2>
                        <input
                            type="text"
                            value={newProduct.productName}
                            onChange={(e) =>
                                setNewProduct({ ...newProduct, productName: e.target.value })
                            }
                            placeholder="Product Name"
                        />
                        <textarea
                            value={newProduct.description}
                            onChange={(e) =>
                                setNewProduct({ ...newProduct, description: e.target.value })
                            }
                            placeholder="Description"
                            rows="3"
                        ></textarea>
                        <input
                            type="number"
                            value={newProduct.quantity}
                            onChange={(e) =>
                                setNewProduct({ ...newProduct, quantity: parseInt(e.target.value) })
                            }
                            placeholder="Quantity"
                        />
                        <input
                            type="number"
                            step="0.01"
                            value={newProduct.price}
                            onChange={(e) =>
                                setNewProduct({ ...newProduct, price: parseFloat(e.target.value) })
                            }
                            placeholder="Price"
                        />
                        <input
                            type="text"
                            value={newProduct.category}
                            onChange={(e) =>
                                setNewProduct({ ...newProduct, category: e.target.value })
                            }
                            placeholder="Category"
                        />
                        <textarea
                            value={newProduct.ingredients}
                            onChange={(e) =>
                                setNewProduct({ ...newProduct, ingredients: e.target.value })
                            }
                            placeholder="Ingredients (comma-separated)"
                            rows="3"
                        ></textarea>
                        <button onClick={handleCreate}>Create</button>
                        <button onClick={() => setIsCreateOpen(false)}>Cancel</button>
                    </div>
                </div>
            )}

            {isUpdateOpen && selectedProduct && (
                <div className={styles.modal}>
                    <div className={styles.modalContent}>
                        <h2>Edit Product</h2>
                        <input
                            type="text"
                            value={selectedProduct.productName || ""}
                            onChange={(e) =>
                                setSelectedProduct({
                                    ...selectedProduct,
                                    productName: e.target.value,
                                })
                            }
                            placeholder="Product Name"
                            className={styles.inputField}
                        />
                        <textarea
                            value={selectedProduct.description || ""}
                            onChange={(e) =>
                                setSelectedProduct({
                                    ...selectedProduct,
                                    description: e.target.value,
                                })
                            }
                            placeholder="Description"
                            rows="4"
                            className={styles.textArea}
                        ></textarea>
                        <input
                            type="number"
                            value={selectedProduct.quantity || 0}
                            onChange={(e) =>
                                setSelectedProduct({
                                    ...selectedProduct,
                                    quantity: parseInt(e.target.value),
                                })
                            }
                            placeholder="Quantity"
                            className={styles.inputField}
                        />
                        <input
                            type="number"
                            step="0.01"
                            value={selectedProduct.price || 0.0}
                            onChange={(e) =>
                                setSelectedProduct({
                                    ...selectedProduct,
                                    price: parseFloat(e.target.value),
                                })
                            }
                            placeholder="Price"
                            className={styles.inputField}
                        />
                        <input
                            type="text"
                            value={selectedProduct.category || ""}
                            onChange={(e) =>
                                setSelectedProduct({
                                    ...selectedProduct,
                                    category: e.target.value,
                                })
                            }
                            placeholder="Category"
                            className={styles.inputField}
                        />
                        <textarea
                            value={selectedProduct.ingredients || ""}
                            onChange={(e) =>
                                setSelectedProduct({
                                    ...selectedProduct,
                                    ingredients: e.target.value,
                                })
                            }
                            placeholder="Ingredients (comma-separated)"
                            rows="4"
                            className={styles.textArea}
                        ></textarea>
                        <div className={styles.buttonGroup}>
                            <button onClick={handleUpdate} className={styles.updateButton}>
                                Update
                            </button>
                            <button
                                onClick={() => setIsUpdateOpen(false)}
                                className={styles.cancelButton}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {isImageUploadOpen && (
                <div className={styles.modal}>
                    <div className={styles.modalContent}>
                        <h2>Upload New Image</h2>
                        <input
                            type="text"
                            value={imageURL}
                            onChange={(e) => setImageURL(e.target.value)}
                            placeholder="Enter new image URL"
                            className={styles.inputField}
                        />
                        <div className={styles.buttonGroup}>
                            <button onClick={handleImageUpload} className={styles.updateButton}>
                                Upload
                            </button>
                            <button
                                onClick={() => setIsImageUploadOpen(false)}
                                className={styles.cancelButton}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}