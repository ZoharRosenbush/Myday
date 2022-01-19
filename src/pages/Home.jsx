import {Link} from 'react-router-dom'
export function Home() {
    return(
        <Link to ='/myday/board/:boardId'><button>Get Started</button></Link>
    )
}