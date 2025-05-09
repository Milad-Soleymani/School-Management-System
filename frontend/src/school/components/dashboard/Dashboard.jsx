import axios from "axios"
import { useEffect, useState } from "react"
import { baseApi } from "../../../enviorment"

export default function Dashboard() {

    const [school, setSchool] = useState(null)

    const fetchSchool = () => {

        axios.get(`${baseApi}/school/fetch-single`).then((res) => {
            console.log(res)
            setSchool(res.data.school)
        }).catch(e => {
            console.log(e)
        })
    } 
    useEffect(()=> {
        
        fetchSchool();



    },[])

    return (
        <>
            <h1>Dashboard</h1>
        </>
    )
}