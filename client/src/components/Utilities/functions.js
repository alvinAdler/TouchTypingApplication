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

export const checkToken = async () => {

    if(Cookies.get("authorToken") === undefined && Cookies.get("refreshToken") === undefined){
        console.log("User has not logged in")
        return {
            status: false,
            message: "No token provided",
            data: undefined
        }
    }

    const result = await axios({
        method: "POST",
        url: "http://localhost:5500/verify",
        headers: {
            "Authorization": `Bearer ${Cookies.get("authorToken")}`
        }
    })

    return {
        status: true,
        message: "Sucess",
        data: result
    }
}

export const deleteCookies = () => {
    if(Object.keys.length > 0){
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
                console.log(res)
                if(res.data.status){
                    deleteCookies()
                    authorize.setAuth(false)

                    swal.fire({
                        icon: "success",
                        title: "Successfully logged out!",
                        text: "Logout is successful and the page will be reloaded",
                        confirmButtonColor: "#2285e4"
                    })
                    .then(() => {
                        window.location.reload()
                    })

                }
            })
            .catch((err) => {
                if(err.response){
                    console.log(err.response)
                }
                if(err.message){
                    console.log(err.message)
                }
            })
        }
    })
}

export const modifyUserCookie = (dataName, currentData) => {
    if(Cookies.get("appData") === undefined){
        const userData = {}
        userData[dataName] = currentData

        Cookies.set("appData", JSON.stringify(userData))
        return
    }

    const existingData = JSON.parse(Cookies.get("appData"))
    
    existingData[dataName] = currentData

    Cookies.set("appData", JSON.stringify(existingData))
}

export const getUserCookie = () => {
    return JSON.parse(Cookies.get("appData"))
}

export const capitalizeString = (currentString) => {
    if(currentString === ""){
        return ""
    }
    return currentString.charAt(0).toUpperCase() + currentString.slice(1)
}


export const changeTimeFormat = (seconds) => {
    if(!seconds){
        return "00:00"
    }
    return new Date(seconds * 1000).toISOString().substr(14, 5)
}

export const convertISOtoUTC = (isoFormat) => {
    let normalizedDate = new Date(isoFormat)
    return normalizedDate.toUTCString()
}

export const changeAccuracyFormat = (accuracy) => {
    return `${accuracy}%`
}

export const countWord =  (word) => {
    return Math.floor(word.length / 5)
}

export const grossWpm = (words, minutes) => {
    return (countWord(words) / minutes).toFixed(1)
}

export const camelCaseToSentenceCase = (text) => {
    let afterRegex = text.replace(/([A-Z])/g, " $1")
    return afterRegex.charAt(0).toUpperCase() + afterRegex.slice(1)
}

export const checkIfUpperCase = (char) => {
    return /^[A-Z]*$/.test(char)
}

export const isChar = (char) => {
    return char.toLowerCase() !== char.toUpperCase()
}