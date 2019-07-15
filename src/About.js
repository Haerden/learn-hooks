import React, {memo} from 'react';

const About = memo(function About(props) {

    console.log('abt');
    return (
        <div>{props.person.age}</div>
    )
});
export default About;