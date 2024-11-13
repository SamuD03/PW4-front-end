"use client";

import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "./page.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faEdit, faSeedling,faTrashAlt } from "@fortawesome/free-solid-svg-icons";

export default function IngredientsDashboard() {
    const [ingredients, setIngredients] = useState([]);
    const [error, setError] = useState(null);
    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [isUpdateOpen, setIsUpdateOpen] = useState(false);
    const [newIngredient, setNewIngredient] = useState("");
    const [selectedIngredient, setSelectedIngredient] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchIngredients() {
            try {
                const response = await fetch("http://localhost:8080/admin/ingredient", {
                    credentials: "include",
                });
                if (!response.ok) {
                    throw new Error("Failed to fetch ingredients");
                }
                const data = await response.json();
                setIngredients(data);
            } catch (err) {
                toast.error(err.message); // Show error toast
            } finally {
                setLoading(false);
            }
        }

        fetchIngredients();
    }, []);

    const handleCreate = async () => {
        try {
            const response = await fetch("http://localhost:8080/admin/ingredient/create", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({ name: newIngredient }),
            });
            if (response.ok) {
                const createdIngredient = await response.json();
                setIngredients([...ingredients, createdIngredient]);
                setNewIngredient("");
                setIsCreateOpen(false);
                toast.success("Ingredient created successfully!"); // Success toast
            } else {
                const errorText = await response.text();
                if (errorText === "Ingredient already exists") {
                    toast.error("Ingredient already exists!"); // Specific error toast
                } else {
                    throw new Error("Failed to create ingredient");
                }
            }
        } catch (err) {
            toast.error(err.message); // Error toast
        }
    };

    const handleUpdate = async () => {
        try {
            const response = await fetch(
                `http://localhost:8080/admin/ingredient/${selectedIngredient.id}/update`,
                {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    credentials: "include",
                    body: JSON.stringify({ name: selectedIngredient.name }),
                }
            );
            if (response.ok) {
                const updatedIngredient = await response.json();
                setIngredients(
                    ingredients.map((ing) =>
                        ing.id === selectedIngredient.id ? updatedIngredient : ing
                    )
                );
                setSelectedIngredient(null);
                setIsUpdateOpen(false);
                toast.success("Ingredient updated successfully!"); // Success toast
            } else {
                const errorText = await response.text();
                toast.error(errorText); // Display the specific error message from the response
            }
        } catch (err) {
            toast.error(err.message); // Error toast
        }
    };

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`http://localhost:8080/admin/ingredient/${id}/delete`, {
                method: "DELETE",
                credentials: "include",
            });
            if (response.ok) {
                setIngredients(ingredients.filter((ingredient) => ingredient.id !== id));
                toast.success("Ingredient deleted successfully!"); // Success toast
            } else {
                const errorText = await response.text();
                toast.error(errorText); // Display the specific error message from the response
            }
        } catch (err) {
            toast.error(err.message); // Error toast
        }
    };

    const containerStyle = {
        padding:
            ingredients.length <= 5
                ? "100px"
                : ingredients.length <= 15
                    ? "80px"
                    : "10px",
    };

    return (
        <div className={styles.container} style={containerStyle}>
            <ToastContainer />
            <h1 className={styles.title}>Ingredients Dashboard</h1>
            {error && <p className={styles.error}>{error}</p>}

            <div className={styles.actions}>
                <button className={styles.createButton} onClick={() => setIsCreateOpen(true)}>
                    <FontAwesomeIcon icon={faPlus} /> Create Ingredient
                </button>
            </div>

            {loading ? (
                <div className={styles.loading}>Loading...</div>
            ) : (
                <div className={styles.ingredientsGrid}>
                    {ingredients.map((ingredient) => (
                        <div key={ingredient.id} className={styles.ingredientCard}>
                            <h2 className={styles.ingredientName}>
                                <FontAwesomeIcon icon={faSeedling} /> {ingredient.name}
                            </h2>
                            <p className={styles.ingredientId}>ID: {ingredient.id}</p>
                            <button
                                className={styles.updateButton}
                                onClick={() => {
                                    setSelectedIngredient(ingredient);
                                    setIsUpdateOpen(true);
                                }}
                            >
                                <FontAwesomeIcon icon={faEdit} /> Update
                            </button>
                            <button
                                className={styles.deleteButton}
                                onClick={() => handleDelete(ingredient.id)}
                            >
                                <FontAwesomeIcon icon={faTrashAlt} /> Delete
                            </button>
                        </div>
                    ))}
                </div>
            )}

            {isCreateOpen && (
                <div className={styles.modal}>
                    <div className={styles.modalContent}>
                        <h2>Create Ingredient</h2>
                        <input
                            type="text"
                            value={newIngredient}
                            onChange={(e) => setNewIngredient(e.target.value)}
                            placeholder="Ingredient name"
                        />
                        <button onClick={handleCreate}>Create</button>
                        <button onClick={() => setIsCreateOpen(false)}>Cancel</button>
                    </div>
                </div>
            )}

            {isUpdateOpen && selectedIngredient && (
                <div className={styles.modal}>
                    <div className={styles.modalContent}>
                        <h2>Update Ingredient</h2>
                        <input
                            type="text"
                            value={selectedIngredient.name}
                            onChange={(e) =>
                                setSelectedIngredient({ ...selectedIngredient, name: e.target.value })
                            }
                            placeholder="Ingredient name"
                        />
                        <button onClick={handleUpdate}>Update</button>
                        <button onClick={() => setIsUpdateOpen(false)}>Cancel</button>
                    </div>
                </div>
            )}
        </div>
    );
}