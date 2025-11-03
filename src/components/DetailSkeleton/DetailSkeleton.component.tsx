import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "./detailSkeleton.styles.scss";

export const DetailSkeleton = () => {
  return (
    <SkeletonTheme baseColor="#2a2a2a" highlightColor="#3a3a3a">
      <div className="detail-skeleton">
        <div className="detail-skeleton__container">
          <Skeleton
            circle
            height="2rem"
            width="2rem"
            className="detail-skeleton__close-button"
          />

          <Skeleton
            height={450}
            width={300}
            className="detail-skeleton__image"
          />

          <div className="detail-skeleton__info">
            <Skeleton
              height={36}
              width={120}
              className="detail-skeleton__rating"
            />

            <Skeleton
              height={32}
              width="80%"
              className="detail-skeleton__title"
            />

            <Skeleton
              height={20}
              width="75%"
              className="detail-skeleton__text"
            />
            <Skeleton
              height={20}
              width="60%"
              className="detail-skeleton__text"
            />
            <Skeleton
              height={20}
              width="60%"
              className="detail-skeleton__text"
            />

            <div className="detail-skeleton__description">
              <Skeleton height={20} width="100%" />
              <Skeleton height={20} width="100%" />
              <Skeleton height={20} width="100%" />
              <Skeleton height={20} width="60%" />
            </div>
          </div>
        </div>
      </div>
    </SkeletonTheme>
  );
};
