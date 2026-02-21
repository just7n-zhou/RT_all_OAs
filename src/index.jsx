import React from "react";
import PlayerDetail from "../player-info";
import players from "../../players.json";

export default function TeamSelection() {
  const [selectedPlayers] = React.useState([]);
  const [welcome, setWelcome] = React.useState(false);
  const [showPlayerDetail, setShowPlayerDetail] = React.useState(false);

  const addPlayer = (_index) => {};
  const removePlayer = (_index) => {};
  const showplayerDetailsCard = (_i) => {};
  const closeCard = () => {};

  return (
    <div className="container py-12">
      <div className="responsive-container" style={{ display: "flex", width: "95%", margin: "0 auto" }}>
        {showPlayerDetail && (
          <PlayerDetail
            selectedPlayers={selectedPlayers}
            i={0}
            close={() => closeCard()}
            index={1}
            addPlayer={(i) => addPlayer(i)}
          />
        )}
      </div>
      <div>
        {/* Further UI implementation goes here */}
      </div>
    </div>
  );
}