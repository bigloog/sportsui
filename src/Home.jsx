import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./App.css";

export default function Home() {
  const [teams, setTeams] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://192.168.1.226:8000/api/teams")
      .then((res) => res.json())
      .then((data) => setTeams(data))
      .catch((err) => console.error("Error fetching teams:", err));
  }, []);

  const groupByLeague = (teams) =>
    teams.reduce((acc, team) => {
      acc[team.league] = acc[team.league] || [];
      acc[team.league].push(team);
      return acc;
    }, {});

  const leagueNames = {
    nfl: "NFL",
    "eng.1": "Premier League",
    nba: "NBA",
    mlb: "MLB",
  };

  const leagueGroups = groupByLeague(teams);

  return (
    <div className="app-wrapper">
      <header className="main-header">
        <div className="logo">🏈 SportsCenter</div>
        <nav className="nav-links">
          <span>Scores</span>
          <span>Teams</span>
          <span>TV</span>
          <span>News</span>
        </nav>
      </header>

      <main className="main-content">
        {Object.entries(leagueGroups).map(([league, teams]) => (
          <section className="league-section" key={league}>
            <h2 className="league-title">{leagueNames[league] || league}</h2>
            <div className="team-grid">
              {teams.map((team) => (
                <div
                  key={team.espn_slug}
                  className="team-card"
                  onClick={() =>
                    navigate(`/fixtures/${team.espn_slug}/${team.league}`)
                  }
                >
                  <img
                    src={team.logo}
                    alt={`${team.name} logo`}
                    className="team-logo"
                  />
                  <div className="team-name">{team.name}</div>
                </div>
              ))}
            </div>
          </section>
        ))}
      </main>
    </div>
  );
}
