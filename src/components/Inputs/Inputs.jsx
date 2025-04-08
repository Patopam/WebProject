function Inputs({ icon, type, placeholder, value, onChange }) {
  const styles = {
    flex: 1,
    padding: "8px",
    display: "flex",
    alignItems: "center",
    border: "1px solid #000",
    borderRadius: "16px",
    padding: "8px",
    width: "100%",
  };
  return (
    <div className="input-container">
      <input
        style={styles}
        type={type}
        placeholder={placeholder}
        icon={icon}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}
export default Inputs;
