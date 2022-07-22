import styled, { css } from 'styled-components';

export const Container = styled.div`
    perspective: 10px;
`;

export const Inner = styled.div`
    box-shadow: 2px 2px 50px rgba(0, 0, 0, 0.2);
    transition: transform 400ms;
    
    ${({x, y}) => css`
        transform: rotateX(${x}deg) rotateY(${y}deg);
    `}
    
`
