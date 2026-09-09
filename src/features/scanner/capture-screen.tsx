export function CaptureScreen({
  onChoose,
  onSample,
}: {
  onChoose: (file: File) => void;
  onSample: () => void;
}) {
  return (
    <div className="camera-screen">
      <div className="plant-art" aria-hidden="true">
        <i />
        <i />
        <i />
        <i />
        <span />
      </div>
      <div className="shade" />
      <div className="intro">
        <span className="live">SAMPLE EXPERIENCE</span>
        <h2>
          Get to know
          <br />
          your plant.
        </h2>
        <p>Explore a sample plan. Photo identification is coming.</p>
      </div>
      <div className="focus" aria-hidden="true">
        <i />
        <i />
        <i />
        <i />
      </div>
      <label className="shutter">
        <span aria-hidden="true">＋</span>
        <input
          aria-label="Choose plant photo"
          type="file"
          accept="image/jpeg,image/png,image/webp"
          capture="environment"
          onChange={(event) => {
            const file = event.target.files?.[0];
            if (file) onChoose(file);
            event.target.value = "";
          }}
        />
      </label>
      <button className="sample" onClick={onSample}>
        Try with sample →
      </button>
    </div>
  );
}
