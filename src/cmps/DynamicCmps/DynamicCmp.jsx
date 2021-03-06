// const ctgsOrder =["status-picker", "member-picker", "date-picker", "priority-picker"]
import { StatusCmp } from "./StatusCmp.jsx";
import { MemberCmp } from "./MemberCmp.jsx";
import { PriorityCmp } from "./PriorityCmp.jsx";
import { RoleCmp } from "./RoleCmp.jsx";
import { TypeCmp } from "./TypeCmp.jsx";
import { DateCmp } from "./DateCmp.jsx";
import { TextCmp } from "./TextCmp.jsx";
import { CostCmp } from "./CostCmp.jsx";


export function DynamicCmp({ cmpData, onUpdateTask, groupColor, taskId, setActiveModal, activeModal }) {

  switch (cmpData.type) {
    case "status-picker":
      return <StatusCmp cmpData={cmpData} taskId={taskId} onUpdateTask={onUpdateTask} activeModal={activeModal} setActiveModal={setActiveModal} />;
    // return <StatusCmp info={info} onUpdate={onUpdate}  />;
    case "member-picker":
      return <MemberCmp cmpData={cmpData} taskId={taskId} onUpdateTask={onUpdateTask} activeModal={activeModal} setActiveModal={setActiveModal} />;
    case "type-picker":
      return <TypeCmp cmpData={cmpData} taskId={taskId} onUpdateTask={onUpdateTask} activeModal={activeModal} setActiveModal={setActiveModal} />;
    case "priority-picker":
      return <PriorityCmp cmpData={cmpData} taskId={taskId} onUpdateTask={onUpdateTask} activeModal={activeModal} setActiveModal={setActiveModal} />
    case "role-picker":
      return <RoleCmp cmpData={cmpData} taskId={taskId} onUpdateTask={onUpdateTask} activeModal={activeModal} setActiveModal={setActiveModal} />
    case "date-picker":
      return <DateCmp cmpData={cmpData} groupColor={groupColor} onUpdateTask={onUpdateTask} />
    case "text":
      return <TextCmp taskId={taskId} cmpData={cmpData} onUpdateTask={onUpdateTask} />
    case "cost":
      return <CostCmp taskId={taskId} cmpData={cmpData} onUpdateTask={onUpdateTask} />

    default:
  }
}
