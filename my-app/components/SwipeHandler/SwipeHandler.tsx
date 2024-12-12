import React, {Component} from 'react';
// @ts-ignore
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';
class SomeComponent extends Component<{ children: any, ticketNumber: number, setTicketNumber: Function, motion: Function }> {

    constructor(props: any) {
        super(props);
        this.state = {
            gestureName: 'none',
        };
    }

    onSwipe(gestureName: any) {
        const ticket = this.props.ticketNumber
        const setTicketNumber = this.props.setTicketNumber
        const scrollMotion = this.props.motion
        const {SWIPE_LEFT, SWIPE_RIGHT} = swipeDirections;
        this.setState({gestureName: gestureName});
        switch (gestureName) {
            case SWIPE_LEFT:
                if (ticket !== 19) {
                    setTicketNumber(ticket + 1)
                    scrollMotion(ticket)
                }
                break;
            case SWIPE_RIGHT:
                if(ticket !== 0) {
                    setTicketNumber(ticket - 1)
                    scrollMotion(ticket - 2)
                }
                break;
        }
    }

    render() {
        const children = this.props.children
        const config = {
            velocityThreshold: 0.3,
            directionalOffsetThreshold: 80
        };

        return (
            <GestureRecognizer
                onSwipe={(direction) => this.onSwipe(direction)}
                config={config}
                style={{flex: 1}}
            >
                {children}
            </GestureRecognizer>
        );
    }
}

export default SomeComponent;