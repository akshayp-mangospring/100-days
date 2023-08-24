function OverlayLoader() {
  return (
    <div className="position-fixed bg-white top-0 start-0 bottom-0 end-0 pe-none">
      <div className="spinner-grow text-primary position-absolute top-50 start-50" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
}

export default OverlayLoader;
