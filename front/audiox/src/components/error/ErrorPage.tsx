import { Link, useRouteError, isRouteErrorResponse } from "react-router-dom";

function ErrorPage(): React.JSX.Element {
  const error = useRouteError();

  let status: string | number = "Error";
  let statusText: string = "A problem occurred.";
  let data: unknown = "No additional info.";

  if (isRouteErrorResponse(error)) {
    status = error.status;
    statusText = error.statusText;
    data = error.data;
  }

  return (
    <div className="error-page">
      <div className="error-card">
        <h1 className="error-status">{status}</h1>
        <h2 className="error-status-text">{statusText}</h2>
        <div className="error-details">
          <p>
            <strong>Details:</strong>
          </p>
          <pre className="error-json">{JSON.stringify(data, null, 2)}</pre>
        </div>
        <Link to="/" className="error-button">
          Back to Home
        </Link>
      </div>
    </div>
  );
}

export default ErrorPage;
