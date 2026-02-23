import React, { useState } from "react";
import PlayerDetail from "../player-info";
import players from "../../players.json";

const ROLE_LIMITS = {
  Batsman: 6,
  Bowler: 6,
  "All-Rounder": 4,
  "Wicket Keeper": 1,
};

export default function TeamSelection() {
  const [selectedPlayers, setSelectPlayers] = useState([]);
  const [welcome, setWelcome] = useState(true);
  const [showPlayerDetail, setShowPlayerDetail] = useState(false);
  const [activePlayerId, setActivePlayerId] = useState(null);

  // Derive a Set of IDs for O(1) lookup speed in the UI
  const selectedIds = new Set(selectedPlayers.map((p) => p.id));

  const addPlayer = (id) => {
    const player = players.find((p) => p.id === id);
    if (!player) return;

    const typeCounts = selectedPlayers.reduce((acc, p) => {
      acc[p.type] = (acc[p.type] || 0) + 1;
      return acc;
    }, {});

    const currentRoleCount = typeCounts[player.type] || 0;

    if (
      selectedPlayers.length < 11 &&
      currentRoleCount < ROLE_LIMITS[player.type] &&
      !selectedIds.has(id)
    ) {
      setSelectPlayers((prev) => [...prev, player]);
    }
  };

  const removePlayer = (id) => {
    setSelectPlayers((prev) => prev.filter((p) => p.id !== id));
  };

  const showplayerDetailsCard = (id) => {
    setActivePlayerId(id);
    setShowPlayerDetail(true);
  };

  const closeCard = () => {
    setShowPlayerDetail(false);
    setActivePlayerId(null);
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
              player={players.find((p) => p.id === activePlayerId)}
              close={closeCard}
              addPlayer={addPlayer}
              selectedIds={selectedIds}
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
                  {players.map((player) => {
                    const nameSlug = player.name.split(" ").join("-");
                    return (
                      <tr
                        key={player.id}
                        data-testid={`available-${nameSlug}-row`}
                        className="tm-row"
                      >
                        <td
                          data-testid={`available-${nameSlug}-name`}
                          onClick={() => showplayerDetailsCard(player.id)}
                        >
                          {player.name}
                        </td>
                        <td
                          data-testid={`available-${nameSlug}-type`}
                          onClick={() => showplayerDetailsCard(player.id)}
                        >
                          {player.type}
                        </td>
                        <td>
                          <button
                            data-testid={`available-${nameSlug}-select`}
                            onClick={() => addPlayer(player.id)}
                            disabled={selectedIds.has(player.id)}
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
                  {selectedPlayers.map((player) => {
                    const nameSlug = player.name.split(" ").join("-");
                    return (
                      <tr
                        key={player.id}
                        data-testid={`selected-${nameSlug}-row`}
                      >
                        <td>{player.name}</td>
                        <td>{player.type}</td>
                        <td>
                          <button
                            data-testid={`selected-${nameSlug}-remove`}
                            onClick={() => removePlayer(player.id)}
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