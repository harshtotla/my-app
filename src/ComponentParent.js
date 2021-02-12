import { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import ComponentReviewBusiness from './ComponentReviewBusiness';
import ComponentSearchBusiness from './ComponentSearchBusiness';

export default class ComponentParent extends Component {
    state = {
        term:"food",
        location:"alpharetta",
        categories:"icecream"
    }
    render () {
        return <div>
            <BrowserRouter>
                <Switch>
                    <Route exact path="/" render={(props) => <ComponentSearchBusiness {...props} term={this.state.term} location={this.state.location} categories={this.state.categories} />} />
                    <Route path="/reviews/:id" render={(props) => <ComponentReviewBusiness {...props}/> } />
                </Switch>
            </BrowserRouter>
        </div>
    }
}