export default function PlayerDetail({ player, close, addPlayer, selectedIds }) {
  if (!player) return null;

  const nameSlug = player.name.split(" ").join("-");

  const handleAdd = () => {
    addPlayer(player.id);
    close();
  };

  return (
    <div className="tm-modal-overlay">
      <div data-testid={`player-${nameSlug}-details`} className="card tm-modal">
        <h4 className="text-center mb-8">Player Detail</h4>

        <div className="tm-modal-body">
          <p className="tm-modal-line">
            <strong>Name:</strong>
            <span data-testid={`player-detail-${nameSlug}-name`}>{player.name}</span>
          </p>
          <p className="tm-modal-line">
            <strong>Type:</strong>
            <span data-testid={`player-detail-${nameSlug}-type`}>{player.type}</span>
          </p>
          <p className="tm-modal-line">
            <strong>Batting:</strong>
            <span data-testid={`player-detail-${nameSlug}-batting`}>{player.battingSkill}</span>
          </p>
          <p className="tm-modal-line">
            <strong>Bowling:</strong>
            <span data-testid={`player-detail-${nameSlug}-bowling`}>{player.bowlingSkill}</span>
          </p>
          <p className="tm-modal-line">
            <strong>Fielding:</strong>
            <span data-testid={`player-detail-${nameSlug}-fielding`}>{player.fieldingSkill}</span>
          </p>
        </div>

        <div className="tm-modal-actions">
          <button
            onClick={handleAdd}
            disabled={selectedIds.has(player.id)}
            data-testid={`player-detail-${nameSlug}-add`}
            className="btn btn-primary tm-modal-add"
          >
            Select
          </button>
          <button
            onClick={close}
            data-testid={`player-detail-${nameSlug}-close`}
            className="btn btn-secondary tm-modal-close"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}