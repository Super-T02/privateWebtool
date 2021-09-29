import styled from "styled-components";

export const Glass = styled.div`
    width: ${props => props.width || "auto"};
    height: ${props => props.height|| "auto"};
    padding: ${props => props.padding || "20px"};
    border-radius: ${props => props.radius || "5px"};
    background: rgba(255, 255, 255, 0.5) !important;
    backdrop-filter: blur(3px);
`

export default Glass;