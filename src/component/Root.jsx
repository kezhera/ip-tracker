import React, { Component } from 'react';
import Map from './Map';
import Header from './Header';

class Root extends Component {
    constructor(props) {
        super(props);

        this.handler = this.handler.bind(this);

        this.state = { 
            items: {
                isLoaded: false,
                ip: 'Proccesing...',
                location: {
                    city : 'Proccesing...',
                    timezone : 'Proccesing...', 
                    lng: -0.09 ,
                    lat: '51.505'
                },
                isp: 'Proccesing...'
            }
         }
    }

    componentDidMount() {
        fetch(`https://geolocation-db.com/json/344ec440-6bfc-11eb-a0c0-b5dee9e67313`)
        .then(res => res.json())
        .then(
            (result) => {       
                fetch(`https://geo.ipify.org/api/v1?apiKey=at_dS7vcFNkO0oJHvzIAN2OSS7NlwIxY&ipAddress=${result.IPv4}`)
                .then(res => res.json())
                .then(
                    (result) => {
                        this.setState({
                            isLoaded : true , 
                            items: result
                        });
                    },
                )
            },
        )
    }
    handler() {
        let value = document.getElementById('search').value;
        this.setState({
            isLoaded : false 
        });
        fetch(`https://geo.ipify.org/api/v1?apiKey=at_dS7vcFNkO0oJHvzIAN2OSS7NlwIxY&ipAddress=${value}`)
        .then(res => res.json())
        .then(
            (result) => {
                this.setState({
                    isLoaded : true , 
                    items: result
                });
            },
        )
    }
    render() { 
        const { items } = this.state;
        const { isLoaded } = this.state;
        if(isLoaded){
            return ( 
                <>
                    <Header action={this.handler} />
                    <div className="info">
                        <div className="row">
                            <div className="item">
                                <span className="info-type">Ip Address</span>
                                <span className="info-result">{items.ip}</span>
                            </div>
                            <div className="item">
                                <span className="info-type">Location</span>
                                <span className="info-result">{items.location.city}</span>
                            </div>
                            <div className="item">
                                <span className="info-type">timezome</span>
                                <span className="info-result">UTC {items.location.timezone}</span>
                            </div>
                            <div className="item">
                                <span className="info-type">isp</span>
                                <span className="info-result">{items.isp}</span>
                            </div>
                        </div>
                    </div>
                    <Map lat={items.location.lat} lng={items.location.lng} />  
                </>
            );
        }else{
            return (
                <div className="loader-background">
                    <div className="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
                </div>
            )
        }
    }
}
 
export default Root;