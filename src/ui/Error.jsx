import { TriangleAlert } from "lucide-react";

export default function Error({ message }) {
    return (
        <div className="error">
            <div className="error-icon">
                <TriangleAlert color="#E5259A" width={40} height={40} />
            </div>

            <h3>Something went wrong</h3>

            <p>{message}</p>

            <button className="error-btn">
                try again
            </button>
        </div>
    )
}