import { FaStar, FaStarHalf } from "react-icons/fa";

function Rating({rating}){
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (i <= rating) {
      stars.push(<FaStar key={i} className=" text-yellow-400 dark:text-yellow-300" />);
    } else if (i - rating <= 0.8) {
      stars.push(<FaStarHalf key={i} className=" text-yellow-400 dark:text-yellow-300" />);
    } else {
    }
  }
  return <>{stars}</>;
}

export default Rating;