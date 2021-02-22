import React, { Component , useState } from 'react';
import arrow from '../images/icon-arrow.svg'


class Header extends Component {
    state = { }

    render() { 
        
        return ( 
            <>
                <header className="header">
                    <h1 className="title">Ip Address Tracker</h1>
                    <div className="search-group">
                        <input type="text" placeholder="seach for any IP address or domain" className="search-input" id="search"/>
                        <button type="submit" className="search-btn" onClick={this.props.action}>
                            <img src={arrow} alt=""/>
                        </button>
                    </div>
                </header>
            </>
         );
    }
}
 
export default Header;