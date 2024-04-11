export const isSucessfull = (status) => {
    return status >= 200 && status < 300
}

export const isFailed = (status) => {
    return status >= 400
}

export const formatAmount = (amount) => {
    return amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
}

export const formatDate = (date) => {
    return new Date(date).toLocaleDateString();
}


export const generateStatusBadge = (status) => {
    switch (status) {
        case 'pending':
            return <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">Pending</span>
        case 'processing':
            return <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">Processing</span>
        case 'shipped':
            return <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Shipped</span>
        case 'delivered':
            return <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Delivered</span>
        default:
            return <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">Pending</span>
    }
}