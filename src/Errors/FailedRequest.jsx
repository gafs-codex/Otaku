import { CircleAlert } from 'lucide-react';

export default function FailedRequest() {
    return (
        <div className="error">
            <div className='error-icon'>
                <CircleAlert />
            </div>
            <h3>Something went wrong.</h3>
            <p>Request failed</p>
            <button onClick={() => window.location.reload()} className='error-btn'>
                Retry
            </button>
        </div>
    );
}