import React from "react";
import { connect } from "react-redux";
import { utilService } from '../../services/utils.service'
import { getImgUrl } from '../../services/cloudinary-service.js'
import { saveTask } from "../../store/board.action";
import nofiles from '../../assets/imgs/nofiles.PNG'
export class _TaskFiles extends React.Component {
    state = {
        imageUrl: ""
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
        return (
            <section className="task-files">
                <section>
                    <form>
                        <input type="file" name="file" className="custom-file-input" placeholder="dshjhk" onChange={(ev) => this.uploadImg(ev)}></input>
                    </form>
                    {!task.files?.length && <div className="nofiles-container"><img className="nofiles" src={nofiles} alt=""></img></div>}
                    <section className="all-files-container">
                        <section className="imgs-container flex">
                            {(!!task.files?.length) && task.files.map((file) => {
                                return <section className="img-files-container flex">
                                    <img src={file.url} alt="" ></img>
                                </section>
                            })}
                        </section>
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