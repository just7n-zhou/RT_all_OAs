import React, { useState } from "react";
import PlayerDetail from "../player-info";
import players from "../../players.json";

export default function TeamSelection() {
  const [selectedPlayers, setSelectPlayers] = useState([]);
  const selectedSet = new Set(selectedPlayers.map((p) => p.name));
  const [welcome, setWelcome] = useState(true);
  const [showPlayerDetail, setShowPlayerDetail] = useState(false);
  const [playerShownIdx, setPlayerShownIdx] = useState(null);

  const addPlayer = (_index) => {
    const player = players[_index];
    const ROLE_LIMITS = {
      Batsman: 6,
      Bowler: 6,
      "All-Rounder": 4,
      "Wicket Keeper": 1,
    };
    const typeCounts = selectedPlayers.reduce((acc, p) => {
      acc[p.type] = (acc[p.type] || 0) + 1;
      return acc;
    }, {});

    if (
      selectedPlayers.length < 11 &&
      (typeCounts[player.type] || 0) < ROLE_LIMITS[player.type] &&
      !selectedPlayers.some((p) => p.name === player.name)
    ) {
      setSelectPlayers((prev) => [...prev, player]);
    }
  };

  const removePlayer = (_index) => {
    setSelectPlayers((prev) => prev.filter((p, i) => i !== _index));
  };
  const showplayerDetailsCard = (_i) => {
    console.log("clicked!");
    setPlayerShownIdx(_i);
    setShowPlayerDetail(true);
  };
  const closeCard = () => {
    setShowPlayerDetail(false);
  };

  return (
    <div className="tm-page">
      <div className="tm-header">
        <h2 className="tm-title">Team Selection</h2>
      </div>

      <div className="container py-12">
        <div className="responsive-container tm-responsive-container">
          {showPlayerDetail && (
            <PlayerDetail
              i={playerShownIdx}
              close={() => closeCard()}
              addPlayer={(i) => addPlayer(i)}
              player={players[playerShownIdx]}
              selectedPlayers={selectedPlayers}
            />
          )}
        </div>

        {welcome && (
          <div className="alert alert-info tm-welcome">
            <span>
              Welcome! Select players to build your team.
              <br />
              You can select up to 11 players with a maximum of 6 batsmen,
              <br />6 bowlers, 4 all-rounders, and 1 wicket keeper.
            </span>
            <button
              onClick={() => setWelcome(false)}
              className="btn btn-secondary"
              id="tm-welcome-close"
            >
              ×
            </button>
          </div>
        )}

        <div className="tm-panels">
          <div className="card tm-panel">
            <h4 className="text-center mb-8">Available Players</h4>
            <div className="overflow-x-auto">
              <table className="table">
                <thead>
                  <tr>
                    <th data-testid="available-players-name">Name</th>
                    <th>Role</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {players.map((player, index) => {
                    const formattedName = player.name.split(" ").join("-");
                    return (
                      <tr
                        key={player.name}
                        data-testid={`available-${formattedName}-row`}
                        className="tm-row"
                      >
                        <td
                          data-testid={`available-${formattedName}-name`}
                          onClick={() => showplayerDetailsCard(index)}
                        >
                          {player.name}
                        </td>
                        <td
                          data-testid={`available-${formattedName}-type`}
                          onClick={() => showplayerDetailsCard(index)}
                        >
                          {player.type}
                        </td>
                        <td>
                          <button
                            data-testid={`available-${formattedName}-select`}
                            onClick={() => addPlayer(index)}
                            // use set for constant look up
                            disabled={selectedSet.has(player.name)}
                            className="btn btn-primary text tm-select-btn"
                          >
                            Select
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          <div className="card tm-panel">
            <h4 className="text-center mb-8">Selected Players</h4>
            <div className="overflow-x-auto">
              <table className="table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Role</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedPlayers.map((player, index) => {
                    const formattedName = player.name.split(" ").join("-");
                    return (
                      <tr
                        key={player.name}
                        data-testid={`selected-${formattedName}-row`}
                      >
                        <td>{player.name}</td>
                        <td>{player.type}</td>
                        <td>
                          <button
                            data-testid={`selected-${formattedName}-remove`}
                            onClick={() => removePlayer(index)}
                            className="btn btn-danger tm-remove-btn"
                          >
                            Remove
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
