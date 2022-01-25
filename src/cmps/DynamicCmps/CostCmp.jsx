
import React from "react";
export class CostCmp extends React.Component {

  state = {
    cost: ""
  }

  componentDidMount() {
    const { cmpData } = this.props
    this.setState({ cost: cmpData.info.cost })
  }

  onUpdateTaskCost = ({ target }) => {
    const { onUpdateTask, cmpData } = this.props
    const value = target.value;
    if (!value) return;
    this.setState({
      cost: value
    }, () => {

      onUpdateTask("cost", value);
    })

  }
  render() {
    const { cmpData } = this.props
    return (

      <div className="cost-cmp">
        <input
          type="number"
          className="task-cost"
          contentEditable
          suppressContentEditableWarning={true}
          onChange={this.onUpdateTaskCost}
          value={this.state.cost}
          min="0"
        >

        </input>
      </div>
    );
  }
}
