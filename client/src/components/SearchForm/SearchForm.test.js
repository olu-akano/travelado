

import { SearchForm } from './index';
jest.mock('react-map-gl-geocoder', () => (  () => 'Search' ));
import { screen } from '@testing-library/react';

describe('SearchForm layout', () => {
    global.URL.createObjectURL = jest.fn();

    beforeEach(() => {
        global.URL.createObjectURL = jest.fn();

        render(<SearchForm />)
    })

    test('Label of search bar is present', () => {
        global.URL.createObjectURL = jest.fn();

        let title = screen.getByText(/Search/i);
        expect(title).toBeTruthy();
    })
        ;
});