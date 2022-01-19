import {TaskDetails} from './TaskDetails.jsx'
import {DynamicCmp} from '../DynamicCmps/DynamicCmp.jsx'


export function TaskPreview({task}){

    
    //GET FROM STORE
    const cmpsOrder =["status-picker", "member-picker", "date-picker", "priority-picker"]
    return (
        <section>
        {cmpsOrder.map((cmp, idx)=>{
           return <DynamicCmp cmp={cmp} key={idx} onUpdate={data => {
               console.log('Updating: ', cmp, 'with data:', data)
           }} />
        
        })}
        <h1>TaskPreview</h1>
        <TaskDetails/>
        </section>
    )
}


        // for monday




// function category(cmpsOrder){
//     return{
//         {cmpsOrder.map(cmp, idx)=>{
//            if{cmp===="status-picker" } return {
           
//         }}
        
//     }
// }



// const cmp1 = {
//     type: 'status-picker',
//     info: {
//         selectedStatus: 'Done',
//         statuses: [{ "value": 'Done', "color": 'green' }, {}]
//     }
// }

// const cmp2 = {
//     type: 'member-picker',
//     info: {
//         selectedMembers: ['m1', 'm2'],
//         members: ['m1', 'm2', 'm3']
//     }
// }

// const cmp3 = {
//     type: 'date-picker',
//     info: {
//         selectedDate: '2022-09-07',
//     }
// }
// const cmp4 = {
//     type: 'priority-picker',
//     info: {
//         selectedStatus: 'High',
//         priorities: [{}, {}]
//     }
// }