import { shallow } from 'enzyme';
import DevJobsApplication from "../components/DevJobsApplication";

describe('DevJobs component', () => {
    const container = shallow(<DevJobsApplication />);
    it('should match the snapshot', () => {
        expect(container.html()).toMatchSnapshot();
    });

    it('should have an app class field', () => {
        expect(container.find('div[className="App"]').length).toEqual(1);
    });

    it('should have an location field', () => {
        expect(container.find('div[className="app-header-class"]').length).toEqual(1);
    });

    it('should have header with app header class', () => {
        expect(container.find('header[className="app-title-header"]').length).toEqual(1);
    });
});