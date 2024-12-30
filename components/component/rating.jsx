import { useState, useId } from "react";
import classNames from "classnames";
import { SfButton, SfRatingButton, SfInput } from "@storefront-ui/react";
import axios from "axios";

export default function ProductRatingWithReview(prodid) {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [username, setUsername] = useState("");
  const [reviewCharacterLimit] = useState(5000);
  const ratingLabelId = useId();

  const reviewIsAboveLimit = review.length > reviewCharacterLimit;
  const reviewCharsCount = reviewCharacterLimit - review.length;

  const submitForm = async (event) => {
    event.preventDefault();
    console.log(`Form submitted with ${rating}`);
    console.log(prodid, "params.prodid");
    try {
      const response = await axios.post("/api/products/addReviewById", {
        id: prodid.prodid,
        rating,
      });
      console.log(response);
    } catch (error) {
      console.error("Error submitting review:", error);
    }
  };

  return (
    <div className="max-w-[376px] md:max-w-[768px]">
      <h3 className="font-bold py-2 pl-4 pr-3 typography-headline-4">
        Leave a review
      </h3>
      <form className="flex items-center md:items-start " onSubmit={submitForm}>
        <div className="col-span-2 md:col-start-2 ">
          <div className="flex flex-col gap-0 md:gap-4 justify-between items-center md:flex-row">
            <div className="flex items-center">
              <p
                id={ratingLabelId}
                className="typography-label-sm font-medium text-neutral-900"
              >
                Your rating:
              </p>
              <SfRatingButton
                value={rating}
                aria-labelledby={ratingLabelId}
                onChange={setRating}
                className="p-1 gap-x-2"
              />
            </div>
            {/* <div className="flex justify-end gap-x-2"> */}
            <div>
              <SfButton type="submit" className="flex-1 md:flex-initial shadow-none ">
                Submit
              </SfButton>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
