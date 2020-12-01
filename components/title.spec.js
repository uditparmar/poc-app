import { shallow } from 'enzyme';

import Title from './title';

describe('Title Component', () => {
  it('should render without crashing', () => {
    const wrapper = shallow(<Title label="test" />);

    expect(wrapper.find('h1')).toHaveLength(1);
  });
});