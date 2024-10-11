import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
    const [todos, setTodos] = useState([]);
    const [text, setText] = useState('');

    useEffect(() => {
        const fetchTodos = async () => {
            const response = await axios.get('http://localhost:5000/todos');
            setTodos(response.data);
        };
        fetchTodos();
    }, []);

    const addTodo = async () => {
        if (text) {
            const response = await axios.post('http://localhost:5000/todos', { text });
            setTodos([...todos, response.data]);
            setText('');
        }
    };

    const deleteTodo = async (id) => {
        await axios.delete(`http://localhost:5000/todos/${id}`);
        setTodos(todos.filter(todo => todo._id !== id));
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-body">
                            <h1 className="card-title text-center">Todo List</h1>
                            <div className="input-group mb-3">
                                <input
                                    type="text"
                                    className="form-control"
                                    value={text}
                                    onChange={(e) => setText(e.target.value)}
                                    placeholder="Add a new todo"
                                />
                                <button className="btn btn-primary" onClick={addTodo}>Add</button>
                            </div>
                            <ul className="list-group">
                                {todos.map(todo => (
                                    <li key={todo._id} className="list-group-item d-flex justify-content-between align-items-center">
                                        {todo.text}
                                        <button className="btn btn-danger btn-sm" onClick={() => deleteTodo(todo._id)}>Delete</button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
