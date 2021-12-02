import React from 'react'
import styled from 'styled-components'

import './ContentHoverButton_master.css'

export const ShadowContent = styled.div.attrs(({...others}) => ({
    ...others
}))`
    background-color: #0770ad;
    color: white;
    width: 100%;
    border-radius: 0.5rem;
    transition: all 200ms ease-in-out;
    border-bottom: 3px solid white;
`;

export const MainButton = styled.button.attrs(({...others}) => ({
    ...others
}))`
    cursor: pointer;
    background-color: ${(props) => props.isSelected ? "white" : "#0770ad"};
    color: ${(props) => props.isSelected ? "#0770ad" : "white"};
    width: 100%;
    padding: 0.5rem;
    margin: 0.25rem;
    border: none;
    border-radius: 0.5rem;
    font-size: 1rem;
    font-weight: 600;
    transition: all 200ms ease-in-out;
    z-index: 5;

    &:hover{
        background-color: #0685CF;
        color: white;
    }
`;

const ContentHoverButton = ({children, buttonText = "Default", isSelected, ...rest}) => {
    return (
        <div className="hover-button-container">
            <MainButton isSelected={isSelected} {...rest}>
                {buttonText}
            </MainButton>
            {isSelected && 
                <ShadowContent>
                    {children}
                </ShadowContent>
            }
        </div>
    )
}

export default ContentHoverButton
