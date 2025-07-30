import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./Fixtures.css"; // CSS styles below

export default function Fixtures() {
  const { teamSlug, leagueSlug } = useParams();
  const [fixtures, setFixtures] = useState([]);
  const [team, setTeam] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://192.168.1.226:8000/api/espn/fixtures/${teamSlug}/${leagueSlug}`)
      .then((res) => res.json())
      .then((data) => {
        setFixtures(data.fixtures || []);
        setTeam(data.team || null);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching fixtures:", err);
        setLoading(false);
      });
  }, [teamSlug, leagueSlug]);

  if (loading) return <div className="loading">Loading fixtures...</div>;

  return (
    <div className="fixtures-container">
      {team && (
        <div className="team-header">
          <img src={team.logo} alt={team.name} className="team-logo-large" />
          <h1>{team.name}</h1>
          <p className="league-name">{team.league}</p>
        </div>
      )}

      {fixtures.length === 0 ? (
        <p className="no-fixtures">No upcoming fixtures.</p>
      ) : (
        <div className="fixture-list">
          {fixtures.map((fix, i) => (
            <div key={i} className="fixture-card">
              <div className="fixture-teams">
                <span>{fix.name || fix.shortName}</span>
              </div>
              <div className="fixture-details">
                <span>{new Date(fix.date).toLocaleString()}</span>
                {fix.venue && <span className="venue">📍 {fix.venue.fullName}</span>}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
