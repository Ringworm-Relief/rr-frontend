import { useParams } from "react-router-dom";

function EducationCategory() {
    let { category } = useParams()

    return (
        <div>
       
            <h1>{category}</h1>
        </div>
    )
}

export default EducationCategory