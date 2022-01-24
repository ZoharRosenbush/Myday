export function CostCmp({ onUpdateTask, cmpData }) {


    function onUpdateTaskCost({ target }) {
      const value = target.textContent;
      if (!value) return;
      onUpdateTask("cost", value);
    }
  
    return (
      <div className="cost-cmp">
        <input
        type="number"
          className="task-cost"
          contentEditable
          suppressContentEditableWarning={true}
          onBlur={onUpdateTaskCost}
        >
          {cmpData.info.cost}
        </input>
      </div>
    );
  }
  