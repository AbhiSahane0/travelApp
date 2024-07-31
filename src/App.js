import { useState } from "react";

function App() {
  const [item, setItem] = useState([]);

  function handleAddItem(item) {
    setItem((items) => [...items, item]);
  }

  function handleBoxClick(id) {
    setItem((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }

  function deleteItem(id) {
    setItem((items) => items.filter((item) => item.id !== id));
  }

  return (
    <>
      <div className="app">
        <Header />
        <Form onAddItem={handleAddItem} />
        <PackingList
          items={item}
          onDelete={deleteItem}
          handleBoxClick={handleBoxClick}
        />
        <Stats />
      </div>
    </>
  );
}
export default App;

function Header() {
  return <h1>🌴Far Away 👜</h1>;
}

function Form({ onAddItem }) {
  const [description, setDescription] = useState("");

  const [quantity, setQuantity] = useState(1);

  function handleSubmit(e) {
    e.preventDefault();

    if (!description) return;

    const newList = {
      id: Date.now(),
      description,
      quantity,
      packed: false,
    };

    onAddItem(newList);
    setDescription("");
    setQuantity(1);
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What you need for your '😍' trip</h3>
      <select
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
      >
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="item..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button>Add</button>
    </form>
  );
}

function Item({ item, onDelete, handleBoxClick }) {
  return (
    <>
      <li>
        <input type="checkbox" onClick={() => handleBoxClick(item.id)} />
        <span style={item.packed ? { textDecoration: "line-through" } : {}}>
          {item.quantity}
          {" " + item.description}
        </span>
        <button onClick={() => onDelete(item.id)}>❌</button>
      </li>
    </>
  );
}

function PackingList({ items, onDelete, handleBoxClick }) {
  return (
    <div className="list">
      <ul>
        {items.map((item) => (
          <Item
            item={item}
            onDelete={onDelete}
            handleBoxClick={handleBoxClick}
            key={item.id}
          />
        ))}
      </ul>
    </div>
  );
}

function Stats() {
  return (
    <footer className="stats">
      <em>
        You have X items in your list and you have already picked up X (x%)
      </em>
    </footer>
  );
}
