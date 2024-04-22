import { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import { BACKEND_URL } from "../../app/utils/constants";
import { useAppSelector } from "../../app/store/hooks";
const ReviewModal = ({ products: orders, onClose, setMyOrders }) => {
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(0);
  const [validated, setValidated] = useState(false);
  const [loading, setLoading] = useState(false);
  const { token } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (review.length > 3 && rating > 0) {
      setValidated(true);
    } else {
      setValidated(false);
    }
  }, [review, rating]);

  const handleSubmit = async () => {
    const ratingObj = {
      products: orders.map((order) => order._id),
      rating: rating,
      comment: review,
    };
    const response = await fetch(`${BACKEND_URL}/reviews/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(ratingObj),
    });
    const data = await response.json();

    if (response.ok) {
      setMyOrders((order) => {
        return order.map((or) => {
          if (orders.find((o) => o._id === or._id)) {
            or.reviews.push(data);
          }
          return or;
        });
      });
    }
    onClose();
  };
  return (
    <div className="fixed z-10 inset-0 overflow-y-auto">
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        <span
          className="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
        >
          &#8203;
        </span>
        <div
          className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full main-order-modal"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-headline"
        >
          <div className="px-4 pt-5 pb-4 sm:p-6 sm:pb-4 ">
            <div className="sm:flex sm:items-start">
              <div
                className="mt-3 text-center sm:mt-0  sm:text-left w-full modal-container-order"
                style={{
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                }}
              >
                <h3 className="text-lg leading-6 font-medium text-primary-900 text-center hover:text-primary-700">
                  Review Product
                </h3>
                <div style={{ display: "contents" }}>
                  {" "}
                  <div className="mt-8">
                    <p className="text-sm text-gray-500">
                      Please leave a review for the product you purchased.
                      <span className="font-semibold"></span>
                    </p>
                  </div>
                  <div className="mt-4">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                      Review
                    </h3>
                    <div className="mt-2">
                      <textarea
                        className="w-full p-2 border border-gray-300 rounded-lg"
                        placeholder="Write your review here"
                        value={review}
                        onChange={(e) => setReview(e.target.value)}
                      ></textarea>
                      {/* show text area error */}
                      {review.length < 4 && review.length > 0 && (
                        <p className="text-xs text-red-500">
                          Review must be at least 4 characters
                        </p>
                      )}
                    </div>

                    {/* rating range input styled */}
                    <div className="mt-4">
                      <h3 className="text-lg leading-6 font-medium text-gray-900">
                        Rating
                      </h3>
                      <div className="mt-2 flex">
                        {[...Array(5)].map((star, i) => {
                          const ratingValue = i + 1;
                          return (
                            <label key={i}>
                              <input
                                type="radio"
                                name="rating"
                                value={ratingValue}
                                onClick={() => setRating(ratingValue)}
                              />
                              <FaStar
                                className="star"
                                color={
                                  ratingValue <= rating ? "#ffc107" : "#d2d3d6"
                                }
                                size={20}
                              />
                            </label>
                          );
                        })}
                      </div>
                    </div>

                    <div className="mt-2">
                      <button
                        className="bg-primary-600 text-white py-2 px-4 rounded-lg w-full mt-4 hover:bg-primary-700 disabled:opacity-50"
                        onClick={handleSubmit}
                        disabled={!validated}
                      >
                        Submit Review
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewModal;
