import React from 'react'
import {businessInfo, businessReviews} from './data'
const axios = require('axios')

export default class ComponentReviewBusiness extends React.Component {
    
    state = {
        businessInfo: {},
        businessReviews: []
    }

    componentDidMount() {
        //this.getInfo()
        //this.getReviews()
        this.setState({
            businessInfo: businessInfo,
            businessReviews: businessReviews.reviews.map(review => {
                return <div key={review.id} style={{margin:"1em 1em"}}>
                    <span>{review.user.name}</span>{' wrote '}
                    <em><span>{review.text}</span></em>{' and rated '}
                    <strong><span>{review.rating}</span></strong>
                </div>
            })
        })
    }

    getInfo = () => {
        axios.get(`https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/${this.props.match.params.id}`, {
            headers: {
                'Authorization': 'Bearer yjB7J7SPkeZRSuWFmYV0sUu3JHoqvdDoluHHeF-XPzdrTjFWtJn29TO2L0IYYoUM_i1wVWelAOvZM4l6Q54kdCF_ViAjf7cc5oF8D1qq7s_hx8v8vWJdEI3jPjgmYHYx',
            }
        })
        .then(response => this.setState({businessInfo: response.data}))
        .catch(err => console.log(err))
    }
    getReviews = () => {
        axios.get(`https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/${this.props.match.params.id}/reviews`, {
            headers: {
                'Authorization': 'Bearer yjB7J7SPkeZRSuWFmYV0sUu3JHoqvdDoluHHeF-XPzdrTjFWtJn29TO2L0IYYoUM_i1wVWelAOvZM4l6Q54kdCF_ViAjf7cc5oF8D1qq7s_hx8v8vWJdEI3jPjgmYHYx',
            }
        })
        .then(response => this.setState({
            businessReviews: businessReviews.reviews.map(review => {
                return <div key={review.id}>
                    <span>{review.user.name}</span>{' wrote '}
                    <em><span>{review.text}</span></em>{' and rated '}
                    <strong><span>{review.rating}</span></strong>
                </div>
            })
        }))
        .catch(err => console.log(err))
    }
    render() {
        return (
            <div>
                <h1 style={{margin:"1em 1em"}}>{this.state.businessInfo.name}</h1>
                {this.state.businessReviews}
            </div>
        )
    }
}