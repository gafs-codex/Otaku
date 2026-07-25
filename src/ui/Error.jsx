import { TriangleAlert } from "lucide-react";

export default function Error({ message }) {
    return (
        <div className="error">
            <div className="error-icon">
                <TriangleAlert />
            </div>

            <h3>Something went wrong</h3>

            <p>{message}</p>
        </div>
    )
}