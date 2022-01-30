import React from "react";
import { connect } from "react-redux";
// import { AiOutlineLike } from 'react-icons/ai'
// import { BsReply, BsBell } from 'react-icons/bs'
// import { HiOutlineClock } from 'react-icons/hi'
// import { CgProfile } from 'react-icons/cg'
import { utilService } from '../../services/utils.service'
import { getImgUrl } from '../../services/cloudinary-service.js'
import { saveTask } from "../../store/board.action";
export class _TaskFiles extends React.Component {
    state = {
        imageUrl: ""
    }
    componentDidMount() {
        console.log('hello');
    }
    componentDidUpdate(prevProps) {
        console.log('this.props.task:', this.props.task);

        if (prevProps.task !== this.props.task) {
            console.log('yes');
        }
    }


    uploadImg = async (ev) => {
        const { task, board, groupId, saveTask } = this.props
        let { user } = this.props

        if (!user) {
            user = {
                "fullname": "Guest",
                "acronyms": "G",
                "_id": utilService.makeId(),
                "username": "guest",
                "imgUrl": "https://res.cloudinary.com/dejo279fn/image/upload/v1642968389/Henry_Gold_kf3jfz.jpg",
                "userColor": "transparent"
            }
        }
        try {
            const url = await getImgUrl(ev)
            console.log('url:', url);
            console.log('task:', task);
            // this.setState({ imageUrl: url })
            if (!task.files) {
                task.files = [{
                    byMember: user,
                    createdAt: Date.now(),
                    id: utilService.makeId(),
                    url: url
                }]
            } else {
                task.files.unshift({
                    byMember: user,
                    createdAt: Date.now(),
                    id: utilService.makeId(),
                    url: url
                })
            }
            const taskToSave = { ...task }
            const boardToSave = utilService.createDeepCopy(board)
            saveTask(taskToSave, groupId, boardToSave, user, null);

        } catch (err) {
            console.log('err:', err);

        }


    }
    render() {
        const { task } = this.props
        console.log('task:', task);

        return (
            <section className="task-files">
                <section>
                    <form>
                        <input type="file" name="file" className="custom-file-input" onChange={(ev) => this.uploadImg(ev)}></input>
                    </form>
                    {!task.files?.length && <h1>hello</h1>}
                    <section className=" imgs-container flex">
                        {(!!task.files?.length) && task.files.map((file) => {
                            return <section className="img-files-container flex">
                                <img src={file.url} alt="" ></img>
                            </section>
                        })}
                    </section>
                </section>
            </section>
        )
    }
}

function mapStateToProps({ userModule }) {
    return {
        user: userModule.user,
    };
}
const mapDispatchToProps = {
    saveTask
}

export const TaskFiles = connect(mapStateToProps, mapDispatchToProps)(_TaskFiles);

/* <button className="add-file-btn">
               <span>+</span> Add file
           </button> */