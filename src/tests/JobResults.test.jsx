import React from "react";
import {shallow} from 'enzyme'
import JobResults from "../components/JobResults";
import axios from 'axios';
import JobSearch from "../components/JobSearch";

const results = [
    {
        company_logo: 'xyz',
        company: 'Company 1',
        title: 'Java Developer',
        created_at: '2/29/2021 4:52:48 PM UTC',
        type: 'Full Time',
        location: 'New York'
    },
    {
        company_logo: 'xyza',
        company: 'Company 2',
        title: 'React Developer',
        created_at: '3/29/2021 4:52:48 PM UTC',
        type: 'Contract',
        location: 'Kansas'
    },
]

describe('Job Results component', () => {
    it('should match the snapshot with zero results', () => {
        jest.spyOn(React, 'useState')
            .mockReturnValueOnce(['', {}])
            .mockReturnValueOnce([false, {}])
            .mockReturnValueOnce([false, {}])
            .mockReturnValueOnce([[], {}])
            .mockReturnValueOnce([{}, {}])
            .mockReturnValueOnce([1, {}])
        axios.get = jest.fn(() => Promise.resolve({status: 200}, {data: []}))
        const container = shallow(<JobResults />);
        expect(container.html()).toMatchSnapshot();
    });

    it('should match the snapshot with results', () => {
        jest.spyOn(React, 'useState')
            .mockReturnValueOnce(['', {}])
            .mockReturnValueOnce([false, {}])
            .mockReturnValueOnce([false, {}])
            .mockReturnValueOnce([results, {}])
            .mockReturnValueOnce([{}, {}])
            .mockReturnValueOnce([1, {}])
        axios.get = jest.fn(() => Promise.resolve({status: 200}, {data: [results]}))
        const container = shallow(<JobResults />);
        expect(container.html()).toMatchSnapshot();
    });

    it('should match the snapshot with results and load more button', () => {
        jest.spyOn(React, 'useState')
            .mockReturnValueOnce(['', {}])
            .mockReturnValueOnce([false, {}])
            .mockReturnValueOnce([false, {}])
            .mockReturnValueOnce([results, {}])
            .mockReturnValueOnce([{}, {}])
            .mockReturnValueOnce([1, {}])
        axios.get = jest.fn(() => Promise.resolve({status: 200}, {data: [results]}))
        const container = shallow(<JobResults displayLoadMoreButton={true} />);
        expect(container.html()).toMatchSnapshot();
    });

    it('should match the snapshot with empty div for job info', () => {
        jest.spyOn(React, 'useState')
            .mockReturnValueOnce(['12345', {}])
            .mockReturnValueOnce([false, {}])
            .mockReturnValueOnce([true, {}])
            .mockReturnValueOnce([[], {}])
            .mockReturnValueOnce([results[0], {}])
            .mockReturnValueOnce([1, {}])
        axios.get = jest.fn(() => Promise.resolve({status: 200}, {data: [results]}))
        const container = shallow(<JobResults />);
        expect(container.html()).toMatchSnapshot();
    });

    describe('validate classes', () => {
        jest.spyOn(React, 'useState')
            .mockReturnValueOnce(['', {}])
            .mockReturnValueOnce([false, {}])
            .mockReturnValueOnce([false, {}])
            .mockReturnValueOnce([results, {}])
            .mockReturnValueOnce([{}, {}])
            .mockReturnValueOnce([1, {}])
        axios.get = jest.fn(() => Promise.resolve({status: 200}, {data: [results]}))
        const container = shallow(<JobResults />);

        it('should have an grid content class field', () => {
            expect(container.find('div[className="grid-content"]').length).toEqual(2);
        });

        it('should have an image class field', () => {
            expect(container.find('img[className="w3-round-small"]').length).toEqual(2);
        });

        it('should have an days and type class field', () => {
            expect(container.find('p[className="days-type"]').length).toEqual(2);
        });

        it('should have an company name class field', () => {
            expect(container.find('p[className="company-name"]').length).toEqual(2);
        });

        it('should have an job location class field', () => {
            expect(container.find('p[className="job-location"]').length).toEqual(2);
        });
    });
});