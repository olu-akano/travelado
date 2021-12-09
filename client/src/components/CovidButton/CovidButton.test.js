import { CovidButton } from './index';
import { screen } from '@testing-library/react';

describe('CovidButton layout', () => {

    beforeEach(() => {
        // global.URL.createObjectURL = jest.fn();
        render(<CovidButton />)
    })

    test('Label of country selector bar is present', () => {
        let title = screen.getAllByText(/Choose a country/i);
        expect(title).toBeTruthy();
    })

});