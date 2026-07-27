import { GlobeOff } from 'lucide-react';

export default function NoInternet() {
    return (
        <div className="error">
            <div className="error-icon">
                <GlobeOff color="#E5259A" width={40} height={40} />
            </div>
            <h3>No Internet Connection</h3>
            <p>Please check your network and try again.</p>

            <button onClick={() => window.location.reload()} className='error-btn'>
                Retry
            </button>
        </div>
    );
}