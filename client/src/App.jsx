// App.js
import React from "react";
import { Switch, Route } from "react-router-dom";
import * as Pages from './pages'

export function App() {
    return (
        <>
            <Switch>
                <Route exact path="/">
                    <Pages.Homepage />
                </Route>
                <Route exact path="/:username">
                    <Pages.Homepage />
                </Route>
                <Route path="/covidpage">
                    <Pages.Covidpage />
                </Route>
            </Switch>


        </>
    );
}
