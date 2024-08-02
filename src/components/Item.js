export default function Item({ item, onDelete, handleBoxClick }) {
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
