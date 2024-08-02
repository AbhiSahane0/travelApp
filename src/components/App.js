import { useState } from "react";
import Header from "./Header";
import Form from "./Form";
import PackingList from "./PackingList";
import Stats from "./Stats";

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
