
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
    const value = target.value;
    if (!value) return;
    this.setState({
      cost: value
    }
    )
  }

  submitCost = () => {

    const { onUpdateTask } = this.props
    onUpdateTask("cost", this.state.cost);
  }


  render() {
    return (
      <div className="cost-cmp">
        <input
          type="number"
          className="task-cost"
          contentEditable
          suppressContentEditableWarning={true}
          onChange={this.onUpdateTaskCost}
          value={this.state.cost}
          onBlur={this.submitCost}
          min="0"
        >

        </input>
      </div>
    );
  }
}
