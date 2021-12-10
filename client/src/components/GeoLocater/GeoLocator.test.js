

import { GeoLocater } from './index';
jest.mock('react-map-gl-geocoder', () => (() => 'Search'));
import { screen } from '@testing-library/react';

describe('Login/Signup button layout', () => {
    // global.URL.createObjectURL = jest.fn();

    beforeEach(() => {
        // global.URL.createObjectURL = jest.fn();

        render(<GeoLocater />)
    })

    test('Label of Search bar is present', () => {
        // global.URL.createObjectURL = jest.fn();

        let title = screen.getByText(/Search/i);
        expect(title).toBeTruthy();
    })
        ;
});