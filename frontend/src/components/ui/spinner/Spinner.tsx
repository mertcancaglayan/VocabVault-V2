import "./Spinner.css"

interface SpinnerProps {
    message: string;
}

function Spinner({ message }: SpinnerProps) {
    return (
        <div className='spinner'>
            <p>{message}</p>
            <div className="grid-loader">
                <div className="grid-dot"></div>
                <div className="grid-dot"></div>
                <div className="grid-dot"></div>
                <div className="grid-dot"></div>
                <div className="grid-dot"></div>
                <div className="grid-dot"></div>
                <div className="grid-dot"></div>
                <div className="grid-dot"></div>
                <div className="grid-dot"></div>
            </div>
        </div>
    )
}

export default Spinner
