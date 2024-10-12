import "./css/InputComp.css";

export const InputComp = ({ label, type, onchange }) => {
  return (
    <div className="wave-group">
      <input
        required
        type={type}
        onChange={(e) => onchange(e.target.value)}
        className="input"
      />
      <span className="bar"></span>
      <label className="label">
        {label.split("").map((char, index) => (
          <span key={index} className="label-char" style={{ "--index": index }}>
            {char}
          </span>
        ))}
      </label>
    </div>
  );
};
