import { TriangleAlert } from "lucide-react";

export default function GatewayError() {
    return (
        <div className="error">
            <div className="error-icon">
                <TriangleAlert color="#E5259A" width={40} height={40} />
            </div>

            <h3>Server Unavailable</h3>
            <p>
                Jikan's servers are currently unavailable.
            </p>

            <button onClick={() => window.location.reload()} className="error-btn">
                Retry
            </button>
        </div>
    );
}