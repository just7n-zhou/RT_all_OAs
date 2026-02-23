export default function PlayerDetail({ i, close, addPlayer, player, selectedPlayers }) {

  const formattedName = player.name.split(" ").join("-");
  const selectedSet = new Set(selectedPlayers.map((p) => p.name));

  return (
    <div className="tm-modal-overlay">
      <div data-testid={`player-${formattedName}-details`} className="card tm-modal">
        <h4 className="text-center mb-8">Player Detail</h4>

        <div className="tm-modal-body">
          <p className="tm-modal-line">
            <strong>Name:</strong>
            <span data-testid={`player-detail-${formattedName}-name`}>{player.name}</span>
          </p>
          <p className="tm-modal-line">
            <strong>Type:</strong>
            <span data-testid={`player-detail-${formattedName}-type`}>{player.type}</span>
          </p>
          <p className="tm-modal-line">
            <strong>Batting:</strong>
            <span data-testid={`player-detail-${formattedName}-batting`}>{player.battingSkill}</span>
          </p>
          <p className="tm-modal-line">
            <strong>Bowling:</strong>
            <span data-testid={`player-detail-${formattedName}-bowling`}>{player.bowlingSkill}</span>
          </p>
          <p className="tm-modal-line">
            <strong>Fielding:</strong>
            <span data-testid={`player-detail-${formattedName}-fielding`}>{player.fieldingSkill}</span>
          </p>
        </div>

        <div className="tm-modal-actions">
          <button
            onClick={() => { addPlayer(i); close(); }}
            disabled={selectedSet.has(player.name)}
            data-testid={`player-detail-${formattedName}-add`}
            className="btn btn-primary tm-modal-add"
          >
            Select
          </button>
          <button
            onClick={close}
            data-testid={`player-detail-${formattedName}-close`}
            className="btn btn-secondary tm-modal-close"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}