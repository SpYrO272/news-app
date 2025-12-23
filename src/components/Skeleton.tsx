export default function Skeleton() {
  return (
    <div className="p-3">
      {[...Array(5)].map((_, i) => (
        <div className="mb-3" key={i}>
          <div className="placeholder-glow">
            <span className="placeholder col-12"></span>
          </div>
        </div>
      ))}
    </div>
  );
}
