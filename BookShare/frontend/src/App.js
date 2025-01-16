import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
    const [books, setBooks] = useState([]);
    const [form, setForm] = useState({ title: '', author: '', genre: '' });

    useEffect(() => {
        fetchBooks();
    }, []);

    const fetchBooks = async () => {
        const response = await axios.get('http://localhost:5000/books');
        setBooks(response.data);
    };

    const addBook = async (e) => {
        e.preventDefault();
        await axios.post('http://localhost:5000/books', form);
        fetchBooks();
        setForm({ title: '', author: '', genre: '' });
    };

    return (
        <div>
            <h1>Book Share Platform</h1>
            <form onSubmit={addBook}>
                <input
                    type="text"
                    placeholder="Title"
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Author"
                    value={form.author}
                    onChange={(e) => setForm({ ...form, author: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Genre"
                    value={form.genre}
                    onChange={(e) => setForm({ ...form, genre: e.target.value })}
                />
                <button type="submit">Add Book</button>
            </form>
            <h2>Available Books</h2>
            <ul>
                {books.map((book) => (
                    <li key={book.id}>
                        <strong>{book.title}</strong> by {book.author} ({book.genre})
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default App;
