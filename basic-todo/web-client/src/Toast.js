function Toast({ setShowToast, toastData: { status, message } }) {
  return (
    <div className="toast-container position-fixed bottom-0 end-0 p-3">
      <div className="toast show" role="alert" aria-live="assertive" aria-atomic="true">
        <div className="toast-header">
          <strong className={`me-auto ${status === 'Success' ? 'text-success' : 'text-danger'}`}>{status}</strong>
          <button type="button" className="btn-close" data-bs-dismiss="toast" aria-label="Close" onClick={() => setShowToast(false)}></button>
        </div>
        <div className="toast-body">{message}</div>
      </div>
    </div>
  );
}

export default Toast;
