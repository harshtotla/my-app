import React from 'react'
import {businessSearchResult} from './data';

const axios = require('axios')

export default class ComponentSearchBusiness extends React.Component {
    state = {
        businessList: [],
        selectedId: ""
    }
    
    componentDidMount() {
        //this.getData(this.props)
        this.setState({
            businessList: businessSearchResult.businesses.map(business => {
            return <div key={business.id}>
                <figure>
                    <img src={business.image_url} alt={business.alias} height="300" width="300" />
                    <figcaption>
                        <strong>{business.name}</strong>
                    </figcaption>
                    <figcaption>
                        <span style={{display:'block'}}>Address: {business.location.display_address.join(" ")}</span>
                        <span style={{display:'block'}}>Rating: {business.rating}</span>
                        <span style={{display:'block'}}>Price: {business.price}</span>
                        <span style={{display:'block'}}>Phone: {business.display_phone}</span>
                    </figcaption>
                    <a href={'/reviews/'+business.id}>reviews</a>
                </figure>
            </div>
            })
        })
    }
    
    getData = (props) => {
        axios.get(`https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=${this.props.term}&location=${this.props.location}&categories=${this.props.categories}`, {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Content-Type,Authorization',
                'Access-Control-Allow-Methods': 'GET',
                'Authorization': 'Bearer yjB7J7SPkeZRSuWFmYV0sUu3JHoqvdDoluHHeF-XPzdrTjFWtJn29TO2L0IYYoUM_i1wVWelAOvZM4l6Q54kdCF_ViAjf7cc5oF8D1qq7s_hx8v8vWJdEI3jPjgmYHYx',
            }
        })
        .then(response => {
            this.setState({
                businessList: response.data.businesses.map(business => {
                    return <div key={business.id}>
                        <figure>
                            <img src={business.image_url} alt={business.alias} height="300" width="300" />
                            <figcaption>
                                <strong>{business.name}</strong>
                            </figcaption>
                            <figcaption>
                                <span style={{display:'block'}}>Address: {business.location.display_address.join(" ")}</span>
                                <span style={{display:'block'}}>Rating: {business.rating}</span>
                                <span style={{display:'block'}}>Price: {business.price}</span>
                                <span style={{display:'block'}}>Phone: {business.display_phone}</span>
                            </figcaption>
                            <a href={'/reviews/'+business.id}>reviews</a>
                        </figure>
                    </div>
                })
            })
        })
        .catch(err => console.log(err))
    }
    render() {
        return (
            <div>
                {this.state.businessList}
            </div>
        )
    }
}