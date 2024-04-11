import { formatAmount,generateStatusBadge } from "../../app/utils/general_utils";
export const OrderInvoiceModal = ({ order, onClose }) => {
    const sampleOrder = {
        "shippingAddress": {
        "address": "house no 88 g8-2",
        "city": "Hyderabad",
        "state": "Sindh",
        "phone": "03160532576"
        },
        "_id": "66158bff2b077e34f0fbb6b9",
        "user": "66095c8433a3b114c1ca0897",
        "orderItems": [
        {
        "_id": "6611b9c1e16005dbdbec8eb0",
        "name": "Abdul Rehman Memon",
        "price": 200,
        "averageRating": 0,
        "id": "6611b9c1e16005dbdbec8eb0"
        },
        {
        "_id": "6611b9c1e16005dbdbec8eb0",
        "name": "Abdul Rehman Memon",
        "price": 200,
        "averageRating": 0,
        "id": "6611b9c1e16005dbdbec8eb0"
        },
        {
        "_id": "6611b9c1e16005dbdbec8eb0",
        "name": "Abdul Rehman Memon",
        "price": 200,
        "averageRating": 0,
        "id": "6611b9c1e16005dbdbec8eb0"
        },
        ],
        "shippingPrice": 150,
        "totalPrice": 2150,
        "isPaid": false,
        "isDelivered": false,
        "status": "pending",
        "createdAt": "2024-04-09T18:42:07.106Z",
        "updatedAt": "2024-04-09T18:42:07.106Z",
        "__v": 0
    }

    
    
    return (
        <div className="fixed z-10 inset-0 overflow-y-auto">
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                    <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                </div>
                <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full main-order-modal" role="dialog" aria-modal="true" aria-labelledby="modal-headline">
                    <div className="px-4 pt-5 pb-4 sm:p-6 sm:pb-4 ">
                        <div className="sm:flex sm:items-start">
                            <div className="mt-3 text-center sm:mt-0  sm:text-left w-full modal-container-order"
                                style={{
                                    backgroundSize: 'cover',
                                  backgroundPosition: 'center',
                                   backgroundRepeat: 'no-repeat'}}
                            >
                                <h3 className="text-lg leading-6 font-medium text-primary-900 text-center hover:text-primary-700">
                                                                        Order Placed Successfully
                                </h3>
                                <div className="mt-8">
                                    <p className="text-sm text-gray-500">
                                        Your order has been placed successfully. Your order id is <strong>{order._id}</strong>
                                    </p>
                                </div>
                                <div className="mt-4">
                                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                                        Order Summary
                                    </h3>
                                    <div className="mt-2">
                                        <p className="text-sm text-gray-500">
                                            <strong>Order Total:</strong> PKR {order.totalPrice}
                                        </p>
                                    </div>
                                    <div className="mt-2">
                                        <p className="text-sm text-gray-500">
                                            <strong>Shipping Charges:</strong> PKR {order.shippingPrice}
                                        </p>
                                    </div>
                                    <div className="mt-2">
                                        <p className="text-sm text-gray-500">
                                            <strong>Order Status:</strong> {generateStatusBadge(order.status)}
                                        </p>
                                    </div>
                                </div>
                                <div className="mt-4">
                                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                                        Shipping Details
                                    </h3>
                                    <div className="mt-2">
                                        <p className="text-sm text-gray-500">
                                            <strong>Address:</strong> {order.shippingAddress.address}, {order.shippingAddress.city}, {order.shippingAddress.state}
                                        </p>
                                    </div>
                                    <div className="mt-2">
                                        <p className="text-sm text-gray-500">
                                            <strong>Phone:</strong> {order.shippingAddress.phone}
                                        </p>
                                    </div>
                                </div>

                                {/* order items in a table */}
                                <div className="mt-4">
                                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                                        Order Items
                                    </h3>
                                        {/* table has max heigght and while scrolling header stays at top */}
                                    <div className="mt-2 overflow-auto max-h-32 ">
                                        <table className="w-full ">
                                            <thead>
                                                <tr>
                                                    <th className="text-left">Product Name</th>
                                                    <th className="text-left">Price</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {order.orderItems.map((item) => (
                                                    <tr key={item._id}>
                                                        <td className="text-left">{item.name}</td>
                                                        <td className="text-left">PKR {item.price}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                    {/* bill and shipping and total*/}
                                    <div className="mt-4">
                                        <p className="text-sm text-gray-700 mb-1">
                                            <strong>Shipping Charges:</strong> PKR {order.shippingPrice}
                                        </p>
                                        <p className="text-sm text-gray-700">
                                            <strong>Order Total:</strong> PKR {formatAmount(order.totalPrice)}
                                        </p>



                                    </div>
                                    </div>
                            </div>

                        </div>
                    </div>
                    <div className="px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                        <button onClick={onClose} type="button" className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary-600 text-base font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 sm:ml-3 sm:w-auto sm:text-sm">
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default OrderInvoiceModal;