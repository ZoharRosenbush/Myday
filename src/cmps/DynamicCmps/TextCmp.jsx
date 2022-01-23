export function TextCmp({ onUpdateTask, cmpData }) {


  function onUpdateTaskText({ target }) {
    const value = target.textContent;
    if (!value) return;
    onUpdateTask("text", value);
  }

  return (
    <div className="text-cmp">
      <p
        className="task-text"
        contentEditable
        suppressContentEditableWarning={true}
        onBlur={onUpdateTaskText}
      >
        {cmpData.info.text}
      </p>
    </div>
  );
}
