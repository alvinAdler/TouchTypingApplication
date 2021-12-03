import React from 'react'
import styled from 'styled-components'

const BlackBanner = styled.div.attrs((attrs) => ({
    ...attrs
}))`
    display: ${(props) => !props.isActive && "none"};
    background-color: rgba(10, 10, 10, 0.7);
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 100;
`;

export default BlackBanner
