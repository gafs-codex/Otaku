import { CloudAlert } from 'lucide-react';

export default function RequestOverload() {
    return (
        <div className="error">
            <div className="error-icon">
                <CloudAlert color="#E5259A" width={40} height={40} />
            </div>
            <h3>Too Many Requests</h3>
            <p>
                Jikan API rate limit exceeded.
                Please wait a few seconds before trying again.
            </p>

            <button onClick={() => window.location.reload()} className='error-btn'>
                Try Again
            </button>
        </div>
    );
}