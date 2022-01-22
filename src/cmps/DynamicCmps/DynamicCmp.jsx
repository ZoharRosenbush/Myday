// const ctgsOrder =["status-picker", "member-picker", "date-picker", "priority-picker"]
import { StatusCmp } from "./StatusCmp.jsx";
import { MemberCmp } from "./MemberCmp.jsx";
import { PriorityCmp } from "./PriorityCmp.jsx";
import { RoleCmp } from "./RoleCmp.jsx";
import { TypeCmp } from "./TypeCmp.jsx";
import { DateCmp } from "./DateCmp.jsx";


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
    // return <MembersCmp cmpData={cmpData} />;
    //   return <StatusCmp task={{ title: "Replace Logo", status: "Done" }} />;
    // return <MemberCmp info={info} onUpdate={onUpdate}  />;
    default:


    // case 'member-picker':
    //     return <MemberCmp task={task}/>

    // case 'date-picker':
    //     return <DateCmp task={task}/>

    // case 'priority-picker':
    //     return <PriorityCmp task={task}/>


  }
  return <h1>Ctgs</h1>;
}
