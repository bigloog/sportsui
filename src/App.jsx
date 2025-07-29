import { useEffect, useState } from "react";

const API_BASE = "http://192.168.1.226:8000";

function App() {
  const [fixtures, setFixtures] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${API_BASE}/api/espn/fixtures/arsenal/eng.1`)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data) => {
        setFixtures(data.fixtures);
      })
      .catch((err) => {
        setError(err.message);
        console.error("Fetch error:", err);
      });
  }, []);

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>Arsenal Fixtures</h1>

      {error && <p style={{ color: "red" }}>Error: {error}</p>}

      {!fixtures && !error && <p>Loading...</p>}

      {fixtures && (
        <ul>
          {fixtures.map((fixture, idx) => (
            <li key={idx}>
              {fixture.date} — {fixture.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
