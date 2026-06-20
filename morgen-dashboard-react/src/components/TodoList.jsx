import React, { useState, useEffect } from 'react';

function TodoList() {
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem('todos');
    return savedTodos ? JSON.parse(savedTodos) : [];
  });
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    setTodos([...todos, { id: Date.now(), text: inputValue, completed: false }]);
    setInputValue('');
  };

  const toggleComplete = (id) => {
    setTodos(todos.map(todo => todo.id === id ? { ...todo, completed: !todo.completed } : todo));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const openTodos = todos.filter(t => !t.completed);
  const completedTodos = todos.filter(t => t.completed);

  return (
    <div style={{ width: '100%', textAlign: 'left' }}>
      <h3 style={{ color: '#ff7b00', marginBottom: '15px' }}>Meine To-Dos</h3>
      
      <form onSubmit={addTodo} style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <input 
          type="text" 
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Neue Aufgabe..."
          style={{ 
            flex: 1, padding: '8px 12px', borderRadius: '8px', 
            border: '1px solid var(--border)', 
            color: 'var(--input-text)', backgroundColor: 'var(--input-bg)' 
          }}
        />
        <button type="submit" style={{ padding: '8px 15px', borderRadius: '8px', border: 'none', backgroundColor: '#ff7b00', color: '#fff', cursor: 'pointer', fontWeight: 'bold' }}>
          +
        </button>
      </form>

      <div style={{ fontSize: '0.8rem', fontWeight: 'bold', marginBottom: '5px', opacity: 0.7 }}>OFFEN</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '15px' }}>
        {openTodos.map(todo => (
          <div key={todo.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px', background: 'var(--item-bg)', color: 'var(--item-text)', borderRadius: '8px' }}>
            <span onClick={() => toggleComplete(todo.id)} style={{ cursor: 'pointer', flex: 1 }}>{todo.text}</span>
            <button onClick={() => deleteTodo(todo.id)} style={{ background: 'none', border: 'none', color: '#ff4d4d', cursor: 'pointer' }}>❌</button>
          </div>
        ))}
        {openTodos.length === 0 && <p style={{ fontSize: '0.9rem', opacity: 0.5, fontStyle: 'italic' }}>Alles erledigt! 🎉</p>}
      </div>

      <div style={{ fontSize: '0.8rem', fontWeight: 'bold', color: '#28a745', marginBottom: '5px' }}>ERLEDIGT ✅</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {completedTodos.map(todo => (
          <div key={todo.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px', background: 'var(--item-bg)', borderRadius: '8px', opacity: 0.5 }}>
            <span onClick={() => toggleComplete(todo.id)} style={{ cursor: 'pointer', flex: 1, textDecoration: 'line-through' }}>{todo.text}</span>
            <button onClick={() => deleteTodo(todo.id)} style={{ background: 'none', border: 'none', color: 'var(--item-text)', cursor: 'pointer' }}>🗑️</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TodoList;