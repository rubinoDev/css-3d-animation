import styled, { css } from 'styled-components';

const getDepth = (value) => {
    switch (value) {
        case 'low':
            return '40px';
        case 'medium':
            return '20px';
        case 'high':
            return '10px';
        default:
            return '40px';
    }
}

export const Container = styled.div`
    perspective: ${({depth}) => getDepth(depth)};
`;

export const Inner = styled.div`
    box-shadow: ${({shadow, shadowColor, shadowOpacity}) => shadow ? `2px 2px 50px rgba(${shadowColor[0] || 0}, ${shadowColor[1] || 0}, ${shadowColor[2] || 0}, ${shadowOpacity})`: 'none'};
    
    transition: transform 400ms;
    
    ${({x, y}) => css`
        transform: rotateX(${x}deg) rotateY(${y}deg);
    `}
    
`
