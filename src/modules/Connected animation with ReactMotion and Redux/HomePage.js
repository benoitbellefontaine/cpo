import React,{Component} from 'react';
//import styled from 'styled-components';
//import PropTypes from 'prop-types';
import { connect} from 'react-redux'
import { push} from 'react-router-redux'
import ItemsGrid from './ItemsGrid';
import ItemPage from './ItemPage';
import FakeItems from './FakeItems';

class HomePage extends React.PureComponent {

    onItemClick = (item, event) => {

        console.log(item)
        this.props.push('item')

        const width = event.currentTarget.offsetWidth;
        const height = event.currentTarget.offsetHeight;
        const x = event.currentTarget.offsetLeft;
        const y = event.currentTarget.offsetTop;

        console.log(width,height,x,y);
        
    }

    render() {
        const {width,height} = this.props;
        return (
            <div>
                <ItemsGrid
                    items={FakeItems}
                    onItemClick={ this.onItemClick }
                    />
            </div>
        )
    }

}

const mapDispatchToProps = {
    push,
}

export default connect(null,mapDispatchToProps)(HomePage);

/*
<ImageAnimation 
                    startingX={400}
                    startingY={200}
                    startingWidth={0}
                    startingHeight={0}
                    endingX={0} 
                    endingY={0} 
                    endingWidth={400} 
                    endingHeight={400} 
                
                    image={"https://i.pinimg.com/564x/3c/80/8b/3c808b46ff15b495df7037fa61f22590.jpg"} />
*/