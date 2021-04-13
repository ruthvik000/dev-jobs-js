import { shallow } from 'enzyme';
import Modal from "../components/Modal";

describe('Modal component', () => {
    it('should renders div with close modal', () => {
        const container = shallow(<Modal open={true} />);
        expect(container.html()).toMatchSnapshot();
    });

    it('should render null', () => {
        const container = shallow(<Modal />);
        expect(container.html()).toMatchSnapshot();
    });
});