import { Link } from "react-router-dom"
const PageNotFound = () => {
  return (
    <div className="text-center">
        <img src={'../assets/images/pageNotFound.JPG'}/>
        <br/>
        <Link to="/"> Ve trang chu</Link>
    </div>
  )
}

export default PageNotFound