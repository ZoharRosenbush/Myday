import React from "react";
import { connect } from "react-redux";


function _TaskFiles() {
    return (
        <React.Fragment>
            <div>files</div>
        </React.Fragment>
    )
}

function mapStateToProps({ userModule }) {
    return {
        //   user: userModule.user,
    };
}
const mapDispatchToProps = {
}

export const TaskFiles = connect(mapStateToProps, mapDispatchToProps)(_TaskFiles);
