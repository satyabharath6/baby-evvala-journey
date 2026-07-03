export default function Stars() {
  const stars = Array.from({ length: 140 });

  return (
    <>
      {stars.map((_, i) => {
        const size = Math.random() > 0.85 ? 3 : 2;

        return (
          <div
            key={i}
            className="star"
            style={{
              width: `${size}px`,
              height: `${size}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 4}s`,
            }}
          />
        );
      })}

      <div className="moon" />
      <div className="shooting-star" />
    </>
  );
}
