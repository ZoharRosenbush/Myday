
import React from 'react'
import { connect } from 'react-redux'

import { closeMsg } from '../../store/msg.actions.js'



class _UserMsg extends React.Component {
    timeoutId;

    componentDidUpdate() {
        // if (this.timeoutId) clearTimeout(this.timeoutId)
        // this.timeoutId = setTimeout(() => {
        //     this.closeMsg()
        // }, 2000)
    }

    closeMsg = () => {
        this.props.closeMsg()
    }

    render() {
        const { msg } = this.props
        // const msgClass = msg.type || ''

        if (!msg.txt) return <React.Fragment></React.Fragment>
        return <div className={'user-msg '}>
            <p>{msg.txt}</p>
            <button onClick={this.closeMsg}>&times;</button>
        </div>
    }

}

function mapStateToProps({ msgModule }) {
    return {
        msg: msgModule.msg
    }
}

const mapDispatchToProps = {
    closeMsg,
}



export const UserMsg = connect(mapStateToProps, mapDispatchToProps)(_UserMsg)