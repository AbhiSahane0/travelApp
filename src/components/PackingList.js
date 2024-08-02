import { useState } from "react";
import Item from "./Item";

export default function PackingList({
  items,
  onDelete,
  handleBoxClick,
  onSetItem,
}) {
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
