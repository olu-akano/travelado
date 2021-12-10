import { CountrySelect } from './index';
jest.mock('./index', () => (() => 'Choose a country'));
import { screen } from '@testing-library/react';

describe('CountrySelect layout', () => {
    beforeEach(() => {
        render(<CountrySelect covidDataCountries={[]} setViewport={() => { }} />)
    })

    test('Label of country selector bar is present', () => {
        let title = screen.getAllByText(/Choose a country/i);
        expect(title).toBeTruthy();
    })
        ;
});