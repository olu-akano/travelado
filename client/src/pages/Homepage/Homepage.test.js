import { Homepage } from './index';
import { screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';


describe('Homepage layout', () => {
    beforeEach(() => {
        render(
            <BrowserRouter>
                <Homepage />
            </BrowserRouter>)
    })

    // test('Title of container is present', () => {
    //     let title = screen.getByText(/let's play !/i);
    //     expect(title).toBeTruthy();
    // })

    test('Login/Signup button text is present', () => {
        let title = screen.getByText(/Login Signup/i);
        expect(title).toBeTruthy();
    })

    test('Latest COVID-19 spread! button text is present', () => {
        let title = screen.getByText(/Latest COVID-19 spread!/i);
        expect(title).toBeTruthy();
    })

    test('Search bar label is present', () => {
        let title = screen.getByText(/Search/i);
        expect(title).toBeTruthy();
    });
});