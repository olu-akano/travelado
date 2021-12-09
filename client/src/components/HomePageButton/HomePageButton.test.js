import { HomePageButton } from './index';
import { screen } from '@testing-library/react';

describe('HomePageButton layout', () => {

    beforeEach(() => {
        // global.URL.createObjectURL = jest.fn();
        render(<HomePageButton />)
    })

    test('Label of HomePageButton is present', () => {
        let title = screen.getByText(/Homepage/i);
        expect(title).toBeTruthy();
    })

});