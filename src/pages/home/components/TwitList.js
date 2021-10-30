import React from 'react';
import Twit from "./Twit";

const TwitList = ({data}) => {

    return (
        <div>
            {data.map(item =>
                <Twit data={item}/>
            )}
        </div>
    );
};

export default TwitList;

