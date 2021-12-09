import { Covidpage } from './index';
import { screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

jest.mock('react-map-gl-geocoder', () => (  () => 'Search' ));


describe('Covidpage layout', () => {
    beforeEach(() => {
        render(
            <BrowserRouter>
                <Covidpage />
            </BrowserRouter>)
    })



    test('Login/Signup button text is present', () => {
        let title = screen.getAllByText(/Login Signup/i);
        expect(title).toBeTruthy();
    })

    test('Homepage button text is present', () => {
        let title = screen.getAllByText(/Homepage/i);
        expect(title).toBeTruthy();
    })

    test('Choose a country bar label is present', () => {
        let title = screen.getAllByText(/Choose a country/i);
        expect(title).toBeTruthy();
    });
});