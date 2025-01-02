import React, { useState, useEffect } from "react";
import "../components/styles/landingpage.css";
import data from "../data_base/data.json";
import imageLogo from "../components/logo.png";
import socialLogo from "../components/socialogo.png";

const LandingPage = ({ onLogOff }) => {
  const [stats, setStats] = useState({
    totalPlays: 0,
    songsListened: 0,
    differentArtists: 0,
    minutesListened: 0,
    mostPlayedSong: { title: "", plays: 0 },
  });
  const [averageMinutes, setAverageMinutes] = useState(null);
  const [showAverage, setShowAverage] = useState(false);

  useEffect(() => {
    const processedStats = processMusicData(data);
    setStats(processedStats);
    const average = calculateAverageMinutes(processedStats.minutesListened);
    setAverageMinutes(average);
  }, []);

  const processMusicData = (data) => {
    const totalPlays = data.length;
    const minutesListened = Math.floor(
      data.reduce((total, entry) => total + (entry.ms_played || 0), 0) / 60000
    );

    const uniqueSongs = new Set(
      data
        .filter(
          (entry) => entry.master_metadata_track_name && entry.ms_played > 0
        )
        .map((entry) => entry.master_metadata_track_name)
    );

    const uniqueArtists = new Set(
      data
        .filter((entry) => entry.master_metadata_album_artist_name)
        .map((entry) => entry.master_metadata_album_artist_name)
    );

    const songPlays = data.reduce((acc, entry) => {
      const songName = entry.master_metadata_track_name;
      const playTime = entry.ms_played;
      if (songName && playTime > 0) {
        acc[songName] = (acc[songName] || 0) + playTime;
      }
      return acc;
    }, {});

    const mostPlayedSong = Object.entries(songPlays).reduce(
      (mostPlayed, [song, totalMs]) =>
        totalMs > mostPlayed.ms ? { title: song, ms: totalMs } : mostPlayed,
      { title: "", ms: 0 }
    );
    mostPlayedSong.plays = Math.floor(mostPlayedSong.ms / 60000);

    return {
      totalPlays,
      songsListened: uniqueSongs.size,
      differentArtists: uniqueArtists.size,
      minutesListened,
      mostPlayedSong,
    };
  };

  const calculateAverageMinutes = (minutesListened) => {
    const totalMinutes = minutesListened;
    const days = data.length
      ? Math.round((new Date() - new Date(data[0].ts)) / (1000 * 60 * 60 * 24))
      : 1;
    return (totalMinutes / days).toFixed(0);
  };

  const handleToggleAverage = () => {
    setShowAverage((prev) => !prev);
  };

  return (
    <div className="landingpage">
      <div className="landingpage-header">
        <div className="header-logo">
          <img src={imageLogo} alt="Logo" />
        </div>
        <div className="header-home">
          <button onClick={() => console.log("Go Back")}>HOME</button>
        </div>
        <div className="header-logoff-social">
          <img
            src={socialLogo}
            alt="Social Icon"
            className="header-social-logo"
          />
          <button onClick={onLogOff} className="header-logoff-button">
            Log Off
          </button>
        </div>
      </div>

      <div className="landingpage-container">
        <div className="header-greeting-box" onClick={handleToggleAverage}>
          {showAverage ? (
            <div>
              <h1>{averageMinutes} minutes/day</h1>
              <p style={{ cursor: "pointer", color: "#999" }}>
                Click here to see "Hello Tiago" again
              </p>
            </div>
          ) : (
            <div>
              <h1>Hello Tiago</h1>
              <p style={{ cursor: "pointer", color: "#999" }}>
                Click here to see the average time spent on app
              </p>
            </div>
          )}
        </div>

        <div className="landingpage-stats">
          {[
            { label: "Total Plays", value: stats.totalPlays },
            { label: "Music", value: stats.songsListened },
            { label: "Artists", value: stats.differentArtists },
            { label: "Total Minutes Played", value: stats.minutesListened },
          ].map((stat, index) => (
            <div
              className="landingpage-stat-item"
              key={index}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-10px)";
                e.currentTarget.style.transition = "transform 0.3s";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0px)";
              }}
            >
              <div className="stat-value">{stat.value.toLocaleString()}</div>
              <div className="stat-label">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="landingpage-most-played">
          <h3>“{stats.mostPlayedSong.title || "No song listened"}”</h3>
          <p>Most Played Song</p>
          {stats.mostPlayedSong.plays > 0 && (
            <p>{stats.mostPlayedSong.plays} minutes</p>
          )}
        </div>
      </div>

      <footer className="landingpage-footer">
        © 2024 Spotidados All rights reserved.
      </footer>
    </div>
  );
};

export default LandingPage;
