import { HomePageButton } from './index';
jest.mock('react-map-gl-geocoder', () => (() => 'Homepage'));
import { screen } from '@testing-library/react';

describe('HomePageButton layout', () => {

    beforeEach(() => {
        global.URL.createObjectURL = jest.fn();
        render(<HomePageButton />)
    })

    test('Label of HomePageButton is present', () => {
        let title = screen.getAllByText(/Homepage/i);
        expect(title).toBeTruthy();
    })

});