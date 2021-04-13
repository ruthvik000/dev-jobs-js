import React from "react";
import {shallow} from 'enzyme'
import JobInfo from "../components/JobInfo";

const result =
    {
        company_logo: 'xyz',
        company: 'Company 1',
        title: 'Java Developer',
        created_at: '2/29/2021 4:52:48 PM UTC',
        type: 'Full Time',
        location: 'New York',
        description: 'Need an experienced developer with 5 years of real-time experience.',
        how_to_apply: 'Visit Careers Website'
    }

describe('Job Info component', () => {
    it('should match the snapshot with zero results', () => {
        const container = shallow(<JobInfo />);
        expect(container.html()).toMatchSnapshot();
    });

    it('should match the snapshot with results', () => {
        const container = shallow(<JobInfo jobInfo={result} />);
        expect(container.html()).toMatchSnapshot();
    });

    describe('validate classes', () => {
        const container = shallow(<JobInfo jobInfo={result} />);

        it('should have an job info class field', () => {
            expect(container.find('div[className="job-info"]').length).toEqual(1);
        });

        it('should have an job details title field', () => {
            expect(container.find('h2[className="job-details-title"]').length).toEqual(1);
        });

        it('should have an company name url button', () => {
            expect(container.find('button[className="company-url-button"]').length).toEqual(1);
        });

        it('should have an job description body', () => {
            expect(container.find('div[className="job-description-body"]').length).toEqual(1);
        });

        it('should have an days and type field', () => {
            expect(container.find('p[className="days-type"]').length).toEqual(1);
        });

        it('should have an job location field', () => {
            expect(container.find('p[className="job-location"]').length).toEqual(1);
        });

        it('should have an job description field', () => {
            expect(container.find('p[className="job-description"]').length).toEqual(1);
        });

        it('should have an how to apply div', () => {
            expect(container.find('div[className="how-to-apply"]').length).toEqual(1);
        });
    });
});