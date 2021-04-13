import React from 'react';
import DateFormat from "./DateFormat";

// Component to render Job Info results.
function JobInfo(props) {
    const jobDetails = props.jobInfo;
    if (props.jobInfo) {
        return (
            <div>
                <div className='job-info'>
                    <img className='w3-round-small job-info-image'
                         style={{float: 'left'}}
                         src={jobDetails.company_logo}
                         alt={jobDetails.company}
                         height="100px"
                         width="100px"
                    />
                    <div className='jobsite'>
                        <h2 className='job-details-title'>{jobDetails.company}</h2>
                        <a href={jobDetails.company_url} target="_blank" rel="noopener noreferrer">
                            <button className="company-url-button">Company Site</button>
                        </a>
                    </div>
                </div>
                <div className='job-description-body'>
                    <a href={jobDetails.company_url} target="_blank" rel="noopener noreferrer">
                        <button className="apply-now-button">Apply Now</button>
                    </a>
                    <p className='days-type'>{DateFormat(new Date(jobDetails.created_at))} . {jobDetails.type}</p>
                    <h3 className='job-title'>{jobDetails.title}</h3>
                    <p className='job-location'>{jobDetails.location}</p>
                    <p className='job-description'>{jobDetails.description}</p>
                </div>
                <div className='how-to-apply'>
                    <h5>How to Apply</h5>
                    <p>{jobDetails.how_to_apply}</p>
                </div>
            </div>
        );
    }
}

export default (JobInfo)