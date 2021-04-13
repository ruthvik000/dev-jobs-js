import React from 'react';
import DateFormat from "./DateFormat";
import axios from "axios";
import JobInfo from "./JobInfo";

// Component to render search results.
function JobResults(props) {
    const [positionId, setPositionId] = React.useState('');
    const [error, setError] = React.useState(false);
    const [positionById, setPositionById] = React.useState(false);
    const [items, setItems] = React.useState([]);
    const [jobInfo, setJobInfo] = React.useState({});
    let content;

    React.useEffect(() => {
        axios.get(`https://cors-anywhere.herokuapp.com/https://jobs.github.com/positions.json?page=${props.pageNumber}${props.queryParam}`)
            .then(
                (result) => {
                    if (result.status !== 200) {
                        setError(true)
                    } else if (props.displayLoadMoreButton) {
                        if (result.data.length === 0) {
                            props.setDisplayLoadMoreButton(false);
                        }
                        setItems([...new Set([...items, ...result.data])])
                    } else {
                        setItems([...new Set(result.data)]);
                        props.setDisplayLoadMoreButton(true);
                    }
                },
            ).catch(() =>
            setError(true))
        // eslint-disable-next-line
    }, [props.pageNumber, props.queryParam])

    React.useEffect(() => {
        // Added this check is to not call the API when initially loading the application
        if (positionId !== '') {
            axios.get(`https://cors-anywhere.herokuapp.com/https://jobs.github.com/positions/${positionId}.json?markdown=true`)
                .then(
                    (result) => {
                        if (result.status !== 200) {
                            setError(true)
                        } else {
                            setJobInfo(result.data);
                            setPositionById(true);
                            setPositionId('')
                        }
                    },
                ).catch(() =>
                setError(true))
        }
    }, [positionId])

    function handleGridItemClick(id) {
        setPositionId(id)
        props.setJobSearchHeader(false);
    }

    function loadMoreItems() {
        props.setPageNumber(props.pageNumber + 1)
    }

    let errorMessage;
    if (error) {
        errorMessage =  <div>Results Failed to Load! Please Try Again..!</div>
    }

    if (positionById) {
        return <JobInfo jobInfo={jobInfo}/>
    } else {
        content = items.map((result, index) =>
            <div className='grid-content' key={index} onClick={() => handleGridItemClick(result.id)}>
                <img className='w3-round-small'
                     style={{
                         position: "absolute",
                         top: '-6%',
                         backgroundColor: "white",
                         left: '2%',
                         border: '1px solid #ececec',
                         padding: '5px'
                     }}
                     src={result.company_logo}
                     alt={result.company}
                     height="40px"/>
                <p className='days-type'>{DateFormat(new Date(result.created_at))} . {result.type}</p>
                <h4 className="job-title">{result.title}</h4>
                <p className='company-name'>{result.company}</p>
                <p className='job-location'>{result.location}</p>
            </div>
        );
    }

    let button;
    button = (items.length > 49 && props.displayLoadMoreButton) ?
        <button className="load-more-button" type="button" onClick={loadMoreItems}>Load More</button> : null

    return (
        <div style={{position: "relative"}}>
            <div className='grid'>
                {content}
                {errorMessage}
            </div>
            <div className="load-more">
                {button}
            </div>
        </div>
    );
}

export default (JobResults)