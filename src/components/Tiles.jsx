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
        <div className='flex flex-col items-center'>
            <img
                src={hospital.imageURL}
                alt={hospital.alt}
                className='rounded-xl m-8 items-center w-fit h-96 object-cover'
            />
            <div className='flex justify-center gap-4 px-4 py-2 w-screen bg-gray-200 text-4xl'>
                <h1 className='m-4 font-bold'>{hospital.name} </h1>
                <p className='m-4'>|</p>
                <p className='m-4 font-semibold'>{hospital.location} </p>
                <p className='m-4'>|</p>
                <p className='m-4 font-semibold'>{hospital.helpline}</p>
            </div>
            <div className='flex justify-center gap-2 text-xl font-semibold'>
                <button onClick={handlePreviousClick} className='bg-gray-900 text-white rounded-md px-4 py-2 m-4'>
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z"/></svg>
                </button>
                
                <h3 className='m-4'>
                    ({index + 1} of {hospitalList.length})
                </h3>
                
                <button onClick={handleNextClick} className='bg-gray-900 text-white rounded-md px-4 py-2 m-4'>
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M647-440H160v-80h487L423-744l57-56 320 320-320 320-57-56 224-224Z"/></svg>
                </button>
            </div>
        </div>
        </>
    );
}