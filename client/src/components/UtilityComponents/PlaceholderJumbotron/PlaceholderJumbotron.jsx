import React, {useState} from 'react'

import './PlaceholderJumbotron_master.css'

const PlaceholderJumbotron = ({pageTitle = "Sample Title"}) => {

    return (
        <div className="jumbotron-container">
            <h1>{pageTitle}</h1>
            <p className="lead">Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt placeat dolores eum optio quasi odit excepturi corporis dolorum, ipsum obcaecati aut mollitia praesentium voluptates veritatis velit iure dolore numquam rem!</p>
            <hr className="my-4" />
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum numquam sequi exercitationem debitis quod laboriosam eius reiciendis voluptas quae saepe blanditiis dignissimos vel eos quo accusamus, modi adipisci dolores incidunt.</p>
        </div>
    )
}

export default PlaceholderJumbotron
