export default function Stats({ item }) {
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
