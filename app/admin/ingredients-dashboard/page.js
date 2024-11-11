"use client";

import { useEffect, useState } from 'react';
import styles from './page.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faEdit } from '@fortawesome/free-solid-svg-icons';

export default function IngredientsDashboard() {
    const [ingredients, setIngredients] = useState([]);
    const [error, setError] = useState(null);
    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [isUpdateOpen, setIsUpdateOpen] = useState(false);
    const [newIngredient, setNewIngredient] = useState('');
    const [selectedIngredient, setSelectedIngredient] = useState(null);

    useEffect(() => {
        async function fetchIngredients() {
            try {
                const response = await fetch('http://localhost:8080/admin/ingredient', {
                    credentials: 'include',
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch ingredients');
                }
                const data = await response.json();
                setIngredients(data);
            } catch (err) {
                setError(err.message);
            }
        }

        fetchIngredients();
    }, []);

    const handleCreate = async () => {
        try {
            const response = await fetch('http://localhost:8080/admin/ingredient/create', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({ name: newIngredient }),
            });
            if (response.ok) {
                const createdIngredient = await response.json();
                setIngredients([...ingredients, createdIngredient]);
                setNewIngredient('');
                setIsCreateOpen(false);
            } else {
                throw new Error('Failed to create ingredient');
            }
        } catch (err) {
            setError(err.message);
        }
    };

    const handleUpdate = async () => {
        try {
            const response = await fetch(`http://localhost:8080/admin/ingredient/${selectedIngredient.id}/update`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({ name: selectedIngredient.name }),
            });
            if (response.ok) {
                const updatedIngredient = await response.json();
                setIngredients(
                    ingredients.map((ing) =>
                        ing.id === selectedIngredient.id ? updatedIngredient : ing
                    )
                );
                setSelectedIngredient(null);
                setIsUpdateOpen(false);
            } else {
                throw new Error('Failed to update ingredient');
            }
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Ingredients Dashboard</h1>
            {error && <p className={styles.error}>{error}</p>}

            <div className={styles.actions}>
                <button className={styles.createButton} onClick={() => setIsCreateOpen(true)}>
                    <FontAwesomeIcon icon={faPlus} /> Create Ingredient
                </button>
            </div>

            <ul className={styles.ingredientsList}>
                {ingredients.map((ingredient) => (
                    <li key={ingredient.id} className={styles.ingredientItem}>
                        <span className={styles.ingredientId}>ID: {ingredient.id}</span>
                        <span className={styles.ingredientName}>{ingredient.name}</span>
                        <button
                            className={styles.updateButton}
                            onClick={() => {
                                setSelectedIngredient(ingredient);
                                setIsUpdateOpen(true);
                            }}
                        >
                            <FontAwesomeIcon icon={faEdit} /> Update
                        </button>
                    </li>
                ))}
            </ul>

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