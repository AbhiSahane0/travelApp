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
          onSetItem={setItem}
        />
        <Stats item={item} />
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

function PackingList({ items, onDelete, handleBoxClick, onSetItem }) {
  const [action, setAction] = useState("");

  console.log(action);

  let sortedItem = items;

  function handleClick() {
    // sortedItem = [];
    onSetItem((items) => []);
  }

  if (action === "Input") {
    sortedItem = items;
  }
  if (action === "description") {
    sortedItem = items
      .slice()
      .sort((a, b) => a.description.localeCompare(b.description));
  }
  if (action === "Packed") {
    sortedItem = items
      .slice()
      .sort((a, b) => Number(a.packed) - Number(b.packed));
  }

  return (
    <div className="list">
      <ul>
        {sortedItem.map((item) => (
          <Item
            item={item}
            onDelete={onDelete}
            handleBoxClick={handleBoxClick}
            key={item.id}
          />
        ))}
      </ul>

      <select className="action" onChange={(e) => setAction(e.target.value)}>
        <option value="Input">Sort by Input</option>
        <option value="description">Sort by description</option>
        <option value="Packed">Sort by Packed</option>
      </select>
      <button onClick={handleClick}>Clear List</button>
    </div>
  );
}

function Stats({ item }) {
  const length = item.length;
  const packed = item.filter((items) => items.packed).length;
  const percentage = Math.round((packed / length) * 100);

  return (
    <footer className="stats">
      <em>
        {percentage === 100
          ? `You packed everything ! Ready to go 🚀`
          : `You have ${length} items in your list and you have already picked up
        ${packed} item (${percentage}%)`}
      </em>
    </footer>
  );
}
