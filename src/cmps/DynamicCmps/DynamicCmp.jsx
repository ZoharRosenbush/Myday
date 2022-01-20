// const ctgsOrder =["status-picker", "member-picker", "date-picker", "priority-picker"]
import { StatusCmp } from "./StatusCmp.jsx";
import { MemberCmp } from "./MemberCmp.jsx";
export function DynamicCmp({ cmpData, onUpdateTask}) {
  
  switch (cmpData.type) {
    case "status-picker":
      return <StatusCmp cmpData={cmpData} onUpdateTask={onUpdateTask} />;
      // return <StatusCmp info={info} onUpdate={onUpdate}  />;
      case "member-picker":
      return <MemberCmp cmpData={cmpData} onUpdateTask={onUpdateTask} />;
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
