import { shallow } from 'enzyme';
import JobSearch from "../components/JobSearch";

describe('Job search component', () => {
    const container = shallow(<JobSearch jobSearchHeader={true}/>);
    it('should match the snapshot', () => {
        expect(container.html()).toMatchSnapshot();
    });

    it('should have an search field', () => {
        expect(container.find('input[type="searchInput"]').length).toEqual(1);
    });

    it('should have an location field', () => {
        expect(container.find('input[type="searchLocation"]').length).toEqual(1);
    });

    it('should have check box and search field', () => {
        expect(container.find('input[type="checkbox"]').length).toEqual(1);
        expect(container.find('input[type="button"]').length).toEqual(1);
    });

    it('should have proper props for search job field', () => {
        expect(container.find('input[type="searchInput"]').props()).toEqual({
            className: 'search-input',
            id: 'searchName',
            name: 'searchName',
            onChange: expect.any(Function),
            placeholder: 'Filter by Title, companies, expertise...',
            value: '',
            type: 'searchInput',
        });
    });

    it('should have proper props for search location field', () => {
        expect(container.find('input[type="searchLocation"]').props()).toEqual({
            className: 'search-location',
            id: 'locationName',
            name: 'locationName',
            list: 'default',
            onChange: expect.any(Function),
            placeholder: 'Filter by Location...',
            value: '',
            type: 'searchLocation',
        });
    });

    it('should have proper props for check box', () => {
        expect(container.find('input[type="checkbox"]').props()).toEqual({
            className: 'checkbox-field',
            checked: false,
            id: 'fullTime',
            name: 'fullTime',
            style: {display: 'inline-block', margin: '5px'},
            onChange: expect.any(Function),
            type: 'checkbox',
        });
    });

    it('should have proper props for label field', () => {
        expect(container.find('label[className="checkbox-label"]').props()).toEqual({
            className: 'checkbox-label',
            children: 'Full Time Only',
            htmlFor: 'fullTime'
        });
    });

    it('should have proper props for search field', () => {
        expect(container.find('input[type="button"]').props()).toEqual({
            className: 'search-button',
            value: 'Search',
            onClick: expect.any(Function),
            type: 'button',
        });
    });
});