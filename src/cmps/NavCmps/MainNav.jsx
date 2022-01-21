import { HiSparkles, HiOutlinePuzzle } from 'react-icons/hi'
import { AiOutlineBell, AiOutlineSearch } from 'react-icons/ai'
import { BiGridAlt } from 'react-icons/bi'
import { BsCalendar2Check, BsInbox } from 'react-icons/bs'
import { RiUserAddLine, RiQuestionMark } from 'react-icons/ri'
export function MainNav() {
    return (
        <section className="main-nav">

            <img className="2day-logo" src="https://cdn.monday.com/images/logos/monday_logo_icon.png" alt=""></img>
           <div className='grid-container'>
            <BiGridAlt color='white' size='23px' style={{marginLeft: "6px", marginRight: "6px"}} />
            </div>
            <AiOutlineBell color='white' size='23px'  style={{marginLeft: "19px"}}  />
            <BsInbox color='white' size='23px' style={{marginLeft: "19px"}}  />
            <BsCalendar2Check color='white' size='23px' style={{marginLeft: "19px"}}  />
            <div className="see-plans flex align-center justify-center">
                <h2><HiSparkles color='white'
                    style={{
                        textAlign: 'center'
                    }} />
                    See Plans  </h2>
            </div>
            <HiOutlinePuzzle color='white' size='23px' style={{marginLeft: "19px"}}  />
            <RiUserAddLine color='white' size='23px' style={{marginLeft: "19px"}}  />
            <AiOutlineSearch color='white' size='23px' style={{marginLeft: "19px"}}  />
            <RiQuestionMark color='white' size='23px' style={{marginLeft: "19px"}}  />
<div className='user-avatar'>MZL</div>
        </section>
    )

}

// function mapStateToProps({ userModule }) {
//     return {
//       user: userModule.user,
//     };
//   }
//   const mapDispatchToProps = {
//   }
  
//   export const MainNav = connect(mapStateToProps, mapDispatchToProps)(_MainNav);