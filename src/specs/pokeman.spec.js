import { mount } from '@vue/test-utils'
import Pokeman from '../components/Pokeman'

test('Pokeman component display name', () => {
 const wrapper = mount(Pokeman, {
     props: {
         name:'Pikachu',
         index: 23,
     },
 });

 expect(wrapper.text().toBe('Pikachu'));
});

test('Pokeman html', () => {
    const wrapper = mount(Pokeman, {
        props: {
            name:'Pikachu',
            index: 23,
        },
    });
    expect(wrapper.html()).toMatchSnapshot();
});