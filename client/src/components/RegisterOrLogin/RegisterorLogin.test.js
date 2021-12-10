

import { RegisterOrLogin } from './index';
jest.mock('react-map-gl-geocoder', () => (() => 'Search'));
import { screen } from '@testing-library/react';

describe('Login/Signup  button layout', () => {
    global.URL.createObjectURL = jest.fn();

    beforeEach(() => {
        global.URL.createObjectURL = jest.fn();

        render(<RegisterOrLogin />)
    })

    test('Label of RegisterOrLogin is present', () => {
        global.URL.createObjectURL = jest.fn();

        let title = screen.getByText(/login signup/i);
        expect(title).toBeTruthy();
    })
        ;
});