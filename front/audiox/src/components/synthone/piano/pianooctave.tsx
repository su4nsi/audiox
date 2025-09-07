import "./PianoOctave.css";

const PianoOctave = ({ pressedKeys }: { pressedKeys: Set<string> }) => {
  const whiteKeys = ["S", "D", "F", "G", "H", "J", "K"];
  const blackKeys = ["E", "R", "Y", "U", "I"];

  return (
    <div className="piano">
      {whiteKeys.map((note, i) => (
        <div
          className={`white-key ${
            pressedKeys.has(note.toLowerCase()) ? "active" : ""
          }`}
          key={note}
        >
          <span className="note-label">{note}</span>

          {i !== 2 && i !== 6 && blackKeys.length > 0 ? (
            <div
              className={`black-key ${
                pressedKeys.has(blackKeys[0].toLowerCase()) ? "active" : ""
              }`}
            >
              <span className="note-label-black">{blackKeys.shift()}</span>
            </div>
          ) : null}
        </div>
      ))}
    </div>
  );
};
export default PianoOctave;
