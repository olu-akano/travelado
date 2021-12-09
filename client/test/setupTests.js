import React from 'react';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';

import { searchReducer } from '../reducers';

const TestProviders = ({ initState }) => {
    initState ||= { date: "", result: { sunrise: "", sunset: "" }, loading: false };

    return ({ children }) => (
        <Provider store={testStore}>
            { children }
        </Provider>
    )
}

const renderWithReduxProvider = (ui, options={}) => {
    let TestWrapper = TestProviders(options)
    render(ui, { wrapper: TestWrapper, ...options })
}

global.React = React;