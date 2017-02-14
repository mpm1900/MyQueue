import React from 'react';
import {Link} from 'react-router'

export class ClientHomeComponent extends React.Component {

    render() {
        return (
            <div className="client-home">
                <ul>
                    <li><Link to={`/rooms`}>Search Rooms</Link></li>
                </ul>
            </div>
        );
    }
}