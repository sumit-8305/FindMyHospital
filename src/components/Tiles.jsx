import { useState ,useEffect} from 'react';
import { hospitalList } from '../assets/hospitalData';

export default function Tiles() {
    const [index, setIndex] = useState(0);

    function handleNextClick() {
        setIndex((index + 1) % hospitalList.length);
    }
    function handlePreviousClick() {
        setIndex((index - 1 + hospitalList.length) % hospitalList.length);
    }
    useEffect(() => {
        const intervalId = setInterval(() => {
            setIndex((prevIndex) => (prevIndex + 1) % hospitalList.length);
        }, 10000);

        // Clean up the interval on component unmount
        return () => clearInterval(intervalId);}, [hospitalList.length]);

    let hospital = hospitalList[index];
    return (
        <>
            <button onClick={handlePreviousClick}>
                Prev
            </button>
            <h2>
                <i>{hospital.name} </i>
                by {hospital.location}
            </h2>
            <h3>
                ({index + 1} of {hospitalList.length})
            </h3>
            <img
                src={hospital.imageURL}
                alt={hospital.alt}
            />
            <p>
                {hospital.helpline}
            </p>
            <button onClick={handleNextClick}>
                Next
            </button>
        </>
    );
}
