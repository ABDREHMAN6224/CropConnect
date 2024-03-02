export const isSucessfull = (status) => {
    return status >= 200 && status < 300
}

export const isFailed = (status) => {
    return status >= 400
}