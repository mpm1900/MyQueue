import React from 'react';
import './ClientBody.scss';

export class ClientBodyComponent extends React.Component {


    render() {
        return (
            <div className="client-body">
                {this.props.children}
            </div>
        );
    }
}