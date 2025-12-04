import { useEffect, useState } from "react"
import "./Impostor.css"

interface ImpostorProps {
    value: boolean
}

const Impostor: React.FC<ImpostorProps> = (is_loading) => {

    return (
        <div id="impostor" style={{
            visibility: is_loading.value ? "visible" : "collapse"
        }}>
            <div className="loading" />
        </div>
    )
}
export default Impostor