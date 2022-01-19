import { BoardHeader } from '../cmps/BoardHeader.jsx'
import { BoardNav } from '../cmps/BoardNav.jsx'
import {GroupList} from '../cmps/GroupList.jsx'
export function BoardDetails(){
    return(
        <section>

        <h1>board details</h1>
        <BoardHeader/>
        <BoardNav/>
        <GroupList/>
        </section>
    )
}