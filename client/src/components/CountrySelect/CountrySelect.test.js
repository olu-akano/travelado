import { CountrySelect } from './index';
import { screen } from '@testing-library/react';

describe('CountrySelect layout', () => {
    beforeEach(() => {
        render(<CountrySelect />)
    })

    test('Label of country selector bar is present', () => {
        let title = screen.getAllByText(/Choose a country/i);
        expect(title).toBeTruthy();
    })
        ;
});