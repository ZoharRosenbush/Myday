// const ctgsOrder =["status-picker", "member-picker", "date-picker", "priority-picker"]
import { StatusCmp } from "./StatusCmp.jsx";
import { MemberCmp } from "./MemberCmp.jsx";
export function DynamicCmp({ cmp, info, onUpdate , task}) {
  switch (cmp) {
    case "status-picker":
      return <StatusCmp task={task} />;
      // return <StatusCmp info={info} onUpdate={onUpdate}  />;
    case "member-picker":
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
