import React,{Component} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {Motion, spring} from 'react-motion';

const Image = styled.div`
    background: url('${(props) => props.image}') no-repeat;
    background-position: center;
    /*transform: rotateZ(90deg);*/
    width: ${(props) => props.width}px;
    height: ${(props) => props.height}px;
    left: ${(props) => props.x}px;
    top: ${(props) => props.y}px;
    position: absolute;
`;

class ImageAnimation extends React.Component {
    render() {
        const {
            image,
            startingX,
            startingY,
            startingWidth,
            startingHeight,
            endingX,
            endingY,
            endingWidth,
            endingHeight,
        } = this.props;
        return (
            <Motion
                defaultStyle={{
                    x: startingX,
                    y: startingY,
                    width: startingWidth,
                    height: startingHeight,
                }}
                style={{
                    x: spring(endingX),
                    y: spring(endingY),
                    width: spring(endingWidth),
                    height: spring(endingHeight),
                }}
                >
                {(style) => ( 
                    <Image 
                        x={style.x}
                        y={style.y}
                        width={style.width}
                        height={style.height}
                        image={image}  
                    />
                )}
            </Motion>
        )
    }
}

ImageAnimation.propTypes = {
    image: PropTypes.string.isRequired,
    startingX: PropTypes.number.isRequired,
    startingY: PropTypes.number.isRequired,
    startingWidth: PropTypes.number.isRequired,
    startingHeight: PropTypes.number.isRequired,
    endingX: PropTypes.number.isRequired,
    endingY: PropTypes.number.isRequired,
    endingWidth: PropTypes.number.isRequired,
    endingHeight: PropTypes.number.isRequired,
}

export default ImageAnimation;