
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
    console.log('change:',);
    const { onUpdateTask, cmpData } = this.props
    const value = target.value;
    if (!value) return;
    console.log('target:', target.value);
    this.setState({
      cost: value
    }, () => {
      console.log('this.state:', this.state);

      onUpdateTask("cost", value);
    })

    console.log('cmpData:', cmpData);
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
