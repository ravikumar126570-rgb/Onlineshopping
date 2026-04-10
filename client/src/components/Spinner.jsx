function Spinner({ fullScreen = false, label = 'Loading...' }) {
  return (
    <div className={fullScreen ? 'spinner-screen' : 'spinner-wrap'} role="status" aria-live="polite">
      <div className="spinner" />
      <p>{label}</p>
    </div>
  );
}

export default Spinner;
