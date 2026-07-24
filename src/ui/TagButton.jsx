export default function TagButton({
    children,
    active = false,
    onClick,
    disabled = false, }) {
    return (
        <button
            className={`tag-btn ${active ? "active" : ""}`}
            onClick={onClick}
            disabled={disabled}
        >
            {children}
        </button>
    )
}