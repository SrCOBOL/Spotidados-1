import React, { useState, useEffect } from "react";
import data from "../data_base/data.json"; // Assuming this JSON file contains the data
import "../components/styles/MusicStats.css";

const MusicStats = () => {
  const [view, setView] = useState("artists"); // 'artists' or 'tracks'
  const [limit, setLimit] = useState(10); // Limit of items to show
  const [processedData, setProcessedData] = useState({
    artists: [],
    tracks: [],
  });
  const [timeFilter, setTimeFilter] = useState("all-time"); // Default filter

  // Function to format milliseconds into minutes and seconds (display in ms)
  const formatTime = (ms) => {
    return ms; // Showing in milliseconds
  };

  // Helper function to filter data based on the time filter
  const filterDataByTime = (data, timeFilter) => {
    const currentDate = new Date("2023-12-19"); // Today's date (hardcoded for this example)

    switch (timeFilter) {
      case "last-month":
        const lastMonthDate = new Date(currentDate);
        lastMonthDate.setMonth(lastMonthDate.getMonth() - 1); // Go back one month
        return data.filter((item) => {
          const playDate = new Date(item.ts);
          return playDate >= lastMonthDate && playDate < currentDate;
        });

      case "last-6-months":
        const sixMonthsAgo = new Date(currentDate);
        sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6); // Go back 6 months
        return data.filter((item) => {
          const playDate = new Date(item.ts);
          return playDate >= sixMonthsAgo && playDate < currentDate;
        });

      case "last-year":
        const lastYearDate = new Date(currentDate);
        lastYearDate.setFullYear(lastYearDate.getFullYear() - 1); // Go back 1 year
        return data.filter((item) => {
          const playDate = new Date(item.ts);
          return playDate >= lastYearDate && playDate < currentDate;
        });

      case "all-time":
      default:
        return data; // No filtering, return all data
    }
  };

  // Function to process the data and calculate total plays for artists and tracks
  const processData = () => {
    const filteredData = filterDataByTime(data, timeFilter);

    const trackPlays = filteredData.reduce((acc, item) => {
      const trackName = item.master_metadata_track_name;
      const artistName = item.master_metadata_album_artist_name;
      const msPlayed = item.ms_played;

      if (!acc[trackName]) {
        acc[trackName] = { trackName, artistName, msPlayed: 0, plays: 0 };
      }
      acc[trackName].msPlayed += msPlayed;
      acc[trackName].plays += 1;
      return acc;
    }, {});

    const sortedTracks = Object.values(trackPlays)
      .sort((a, b) => b.plays - a.plays)
      .map((track, index) => ({ ...track, position: index + 1 }));

    const artistPlays = filteredData.reduce((acc, item) => {
      const artistName = item.master_metadata_album_artist_name;

      if (!acc[artistName]) {
        acc[artistName] = { artistName, plays: 0 };
      }
      acc[artistName].plays += 1;
      return acc;
    }, {});

    const sortedArtists = Object.values(artistPlays)
      .sort((a, b) => b.plays - a.plays)
      .map((artist, index) => ({ ...artist, position: index + 1 }));

    setProcessedData({ artists: sortedArtists, tracks: sortedTracks });
  };

  useEffect(() => {
    processData();
  }, [timeFilter]);

  const handleTimeFilterChange = (filter) => {
    setTimeFilter(filter);
    setLimit(10);
  };

  const renderArtistsList = () => (
    <div>
      <h2>Top Artists</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Position</th>
            <th>Artist</th>
            <th>Plays</th>
          </tr>
        </thead>
        <tbody>
          {processedData.artists.slice(0, limit).map((artist) => (
            <tr key={artist.position}>
              <td>{artist.position}</td>
              <td>{artist.artistName}</td>
              <td>{artist.plays}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const renderTracksList = () => (
    <div>
      <h2>Top Tracks</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Position</th>
            <th>Track</th>
            <th>Artist</th>
            <th>Plays (ms)</th>
          </tr>
        </thead>
        <tbody>
          {processedData.tracks.slice(0, limit).map((track) => (
            <tr key={track.position}>
              <td>{track.position}</td>
              <td>{track.trackName}</td>
              <td>{track.artistName}</td>
              <td>{formatTime(track.msPlayed)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <div className="music-stats">
      <div className="buttons">
        <button onClick={() => setView("artists")}>Top Artists</button>
        <button onClick={() => setView("tracks")}>Top Tracks</button>
      </div>

      <div className="time-filter">
        <button onClick={() => handleTimeFilterChange("last-month")}>
          Last Month
        </button>
        <button onClick={() => handleTimeFilterChange("last-6-months")}>
          Last 6 Months
        </button>
        <button onClick={() => handleTimeFilterChange("last-year")}>
          Last Year
        </button>
        <button onClick={() => handleTimeFilterChange("all-time")}>
          All-Time
        </button>
      </div>

      {view === "artists" ? renderArtistsList() : renderTracksList()}

      <div className="show-more">
        {limit <
          (view === "artists"
            ? processedData.artists.length
            : processedData.tracks.length) && (
          <button onClick={() => setLimit(limit + 10)}>Show More</button>
        )}
      </div>
    </div>
  );
};

export default MusicStats;

