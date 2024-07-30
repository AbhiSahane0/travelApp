import { useState } from "react";

const initialItems = [
  { id: 1, description: "Passports", quantity: 2, packed: false },
  { id: 2, description: "Socks", quantity: 12, packed: true },
  { id: 3, description: "Passports", quantity: 2, packed: false },
];

function App() {
  return (
    <>
      <div className="app">
        <Header />
        <Form />
        <PackingList />
        <Stats />
      </div>
    </>
  );
}
export default App;

function Header() {
  return <h1>🌴Far Away 👜</h1>;
}

function Form(e) {
  const [description, setDescription] = useState("");

  const [quantity, setQuantity] = useState(0);

  function handleSubmit(e) {
    e.preventDefault();

    if (!description) return;

    const newList = {
      id: Date.now(),
      description,
      quantity,
      packed: false,
    };
    // console.log(newList);
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
      ></input>
      <button>Add</button>
    </form>
  );
}

function Item({ item }) {
  return (
    <>
      <li>
        <span style={item.packed ? { textDecoration: "line-through" } : {}}>
          {item.quantity}
          {item.description}
        </span>
        <button>❌</button>
      </li>
    </>
  );
}

function PackingList() {
  return (
    <div className="list">
      <ul>
        {initialItems.map((item) => (
          <Item item={item} key={item.id} />
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
