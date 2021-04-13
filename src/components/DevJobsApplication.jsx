import '../assets/DevJobsApplication.css';
import React from 'react';
import DarkModeToggle from "react-dark-mode-toggle";
import JobResults from "./JobResults";
import JobSearch from "./JobSearch";

function DevJobsApplication() {
    const [jobSearchHeader, setJobSearchHeader] = React.useState(true);
    const [queryParam, setQueryParam] = React.useState('');
    const [latitude, setLatitude] = React.useState(0);
    const [longitude, setLongitude] = React.useState(0);
    const [displayLoadMoreButton, setDisplayLoadMoreButton] = React.useState(false);
    const [isDarkMode, setIsDarkMode] = React.useState(false);
    const [pageNumber, setPageNumber] = React.useState(1);

    const body = document.body;

    if (isDarkMode) {
        body.setAttribute('data-theme', 'dark')
    } else {
        body.setAttribute('data-theme', 'light')
    }

    return (
        <div className="App">
            <div className='app-header-class'>
                <header className="app-title-header">
                    <a style={{textDecoration: "none"}} href="/"><p className="app-title">devjobs</p></a>
                </header>
                <DarkModeToggle
                    onChange={setIsDarkMode}
                    className='dark-mode-toggle'
                    checked={isDarkMode}
                    size={50}
                />
                <JobSearch setQueryParam={setQueryParam}
                           queryParam={queryParam}
                           setPageNumber={setPageNumber}
                           setDisplayLoadMoreButton={setDisplayLoadMoreButton}
                           jobSearchHeader={jobSearchHeader}
                           setLatitude={setLatitude}
                           setLongitude={setLongitude}
                           latitude={latitude}
                           longitude={longitude}
                />

            </div>
            <JobResults queryParam={queryParam}
                        setPageNumber={setPageNumber}
                        pageNumber={pageNumber}
                        setDisplayLoadMoreButton={setDisplayLoadMoreButton}
                        displayLoadMoreButton={displayLoadMoreButton}
                        setJobSearchHeader={setJobSearchHeader}
                        latitude={latitude}
                        longitude={longitude}
            />

        </div>
    );
}

export default DevJobsApplication;
