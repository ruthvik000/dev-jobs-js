import React from 'react';
import Modal from "./Modal";

// Component to render search results.
function JobSearch(props) {
    const [resize, setResize] = React.useState(window.innerWidth);
    const [input, setInput] = React.useState('');
    const [checked, setChecked] = React.useState(false);
    const [locationInput, setLocationInput] = React.useState('');
    const [isOpen, setIsOpen] = React.useState(false);
    const handleClick = () => setChecked(!checked)
    const prevQueryParam = usePreviousQueryParamValue(props.queryParam);


    const onresize = function (e) {
        return setResize(e.target.innerWidth);
    }

    function onChangeInput(e) {
        setInput(e.target.value)
    }

    function onChangeLocation(e) {
        if (e.target.value === 'Default Location') {
            getLocation()
        } else {
            props.setLatitude(0);
            props.setLongitude(0);
        }
        setLocationInput(e.target.value)
    }

    function getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition);
        }
    }

    function showPosition(position) {
        props.setLatitude(position.coords.latitude);
        props.setLongitude(position.coords.longitude);
    }

    function handleSearchBar() {
        let string = '';
        if (checked) {
            string += `&full_time=${checked}`
        }
        if (input && input.length > 0) {
            string += `&search=${input}`
        }

        if (props.latitude && props.longitude) {
            string += `&lat=${props.latitude}&long=${props.longitude}`
        } else if (locationInput && locationInput.length > 0) {
            string += `&location=${locationInput}`
        }

        if ((prevQueryParam.length > 0 && string === '') || string.length > 0) {
            props.setDisplayLoadMoreButton(false);
        }
        props.setPageNumber(1);
        props.setQueryParam(string);
    }

    function usePreviousQueryParamValue(value) {
        const ref = React.useRef();
        React.useEffect(() => {
            ref.current = value;
        })
        return ref.current;
    }

    React.useEffect(() => {
        window.addEventListener("resize", onresize);
    }, [resize])

    const searchPlaceHolder = resize < 768 ? 'Filter by Title...' : 'Filter by Title, companies, expertise...';

    let jobSearchInputField =
        <span>
            <i className="fa fa-search job-search" aria-hidden="true"/>
        <input className='search-input'
               type="searchInput"
               id="searchName"
               name="searchName"
               onChange={onChangeInput}
               value={input}
               placeholder={searchPlaceHolder}/>
        </span>

    let remainingFields =
        <span>
            <i className="fa fa-map-marker" aria-hidden="true"/>
            <input className='search-location'
                   type="searchLocation"
                   id="locationName"
                   list='default'
                   name="locationName"
                   value={locationInput}
                   onChange={onChangeLocation}
                   placeholder="Filter by Location..."/>
                   <datalist id="default">
                       <option value="Default Location"/>
                   </datalist>
        </span>
    let content = null;
    if (props.jobSearchHeader) {
        if (resize < 768) {
            content = <form className="search-form">
                {jobSearchInputField}
                <button style={{border: "none"}}
                        className='search-button-filter'
                        onClick={() => setIsOpen(true)}
                        type="button">
                    <i style={{backgroundColor: "none"}} className="fa fa-filter" aria-hidden="true"/>
                </button>
                <Modal open={isOpen} onClose={() => setIsOpen(false)}>
                    <div>
                        <input className="checkbox-field"
                               type="checkbox"
                               id="fullTime"
                               name="fullTime"
                               checked={checked}
                               onChange={handleClick}
                        />
                        <label htmlFor="fullTime" className='checkbox-label'>Full Time Only</label>
                    </div>
                    {remainingFields}
                </Modal>
                <button className="btn search-button-mobile" type="button" onClick={handleSearchBar}>
                    <i className="fa fa-search search-icon-mobile"/>
                </button>
            </form>
        } else {
            content =
                <form className="search-form">
                    {jobSearchInputField}
                    {remainingFields}
                    <span>
                        <input className="checkbox-field"
                               style={{display: 'inline-block', margin: '5px'}}
                               type="checkbox"
                               id="fullTime"
                               name="fullTime"
                               checked={checked}
                               onChange={handleClick}
                        />
                        <label htmlFor="fullTime" className='checkbox-label'>Full Time Only</label>
                        <input className='search-button' type="button" value="Search" onClick={handleSearchBar}/>
                    </span>
                </form>
        }
    }
    return (content);
}

export default (JobSearch)