import { useContext } from 'react'
import Cookies from 'js-cookie'
import axios from 'axios'
import swal from 'sweetalert2'

const partition = (partArr, left, right) => {
    let pivot = partArr[right]
    let leftBorder = left - 1

    for(let rightBorder = left; rightBorder <= right - 1; rightBorder++){
        if(partArr[rightBorder].posX < pivot.posX){
            leftBorder += 1
            let tempVar = partArr[rightBorder]
            partArr[rightBorder] = partArr[leftBorder]
            partArr[leftBorder] = tempVar
        }
    }

    let tempVar = partArr[right]
    partArr[right] = partArr[leftBorder + 1]
    partArr[leftBorder + 1] = tempVar

    return leftBorder + 1
}

export const quickSort = (arr, left, right) => {
    if(left >= right){
        return
    }

    let partitionIndex = partition(arr, left, right)

    quickSort(arr, left, partitionIndex - 1)
    quickSort(arr, partitionIndex + 1, right)
}

export const randomInteger = (lowerBound, upperBound) => {
    return Math.floor(Math.random() * (upperBound - lowerBound)) + lowerBound
}

export const checkToken = () => {

    if(Cookies.get("authorToken") === undefined && Cookies.get("refreshToken") === undefined){
        console.log("User has not logged in")
        return {
            data: {
                status: false,
                message: "No token provided"
            }
        }
    }

    return {
        data: {
            status: true,
            message: "Sucess"
        }
    }
}

export const deleteCookies = () => {
    if(checkToken().data.status){
        Object.keys(Cookies.get()).forEach((cookieName) => {
            Cookies.remove(cookieName)
        })
        return {
            status: true,
            message: "Cookies have been deleted"
        }
    }

    return {
        status: true,
        message: "Cookies does not exist"
    }
}

export const markLastVisitedPath = (currentPath) => {
    Cookies.set("lastPath", currentPath)
}

export const logoutUser = (authorize) => {
    swal.fire({
        icon: "question",
        title: "Confirmation",
        text: "Are you sure to logout?",
        cancelButtonColor: "#eb4034",
        showCancelButton: true,
        confirmButtonColor: "#2285e4",
        confirmButtonText: "Yes"
    })
    .then((res) => {
        if(res.isConfirmed){
            axios({
                method: "POST",
                url: "http://localhost:5500/logout",
                headers: {
                    "Content-type": "application/json"
                },
                data: {
                    refreshToken: Cookies.get("refreshToken")
                }
            })
            .then((res) => {
                if(res.data.status){
                    deleteCookies()
                    authorize.setAuth(false)
                    window.location.reload()
                }
            })
            .catch((err) => {
                console.log(err)
            })
        }
    })
}