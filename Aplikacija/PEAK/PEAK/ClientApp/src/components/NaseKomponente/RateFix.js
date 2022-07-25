import React, { useMemo, useState } from "react";
import PropTypes from "prop-types";
import {FaStar} from 'react-icons/fa';



const RateFix = ({ count, rating, color, onRating }) => {
  const [hoverRating, setHoverRating] = useState(0);

  const getColor = (index) => {
    if (hoverRating >= index) {
      return color.filled;
    } else if (!hoverRating && rating >= index) {
      return color.filled;
    }

    return color.unfilled;
  };

  const starRating = useMemo(() => {
    return Array(count)
      .fill(0)
      .map((_, i) => i + 1)
      .map((idx) => (
        <FaStar
          size={20}
          key={idx}
          className="cursor-pointer"
          icon="AiOutlineStar"
          style={{ color: getColor(idx) }}
        />
      ));
  }, [count, rating, hoverRating]);
  return <div>{starRating}</div>;
};

RateFix.propTypes = {
  count: PropTypes.number,
  rating: PropTypes.number,
  onChange: PropTypes.func,
  color: {
    filled: PropTypes.string,
    unfilled: PropTypes.string,
  },
};

RateFix.defaultProps = {
  count: 5,
  rating: 0,
  color: {
    filled: "#f5eb3b",
    unfilled: "#DCDCDC",
  },
};

export default RateFix;