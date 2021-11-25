import Cookies from 'js-cookie'
import axios from 'axios'

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
            data: {
                status: false,
                message: "No token provided"
            }
        }
    }

    return await axios({
        method: "POST",
        url: "http://localhost:5500/verify",
        headers: {
            "Authorization": `Bearer ${Cookies.get("authorToken")}`
        }
    })
}