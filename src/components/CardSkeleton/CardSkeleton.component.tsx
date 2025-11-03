import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "./cardSkeleton.styles.scss";

export const CardSkeleton = () => {
  return (
    <SkeletonTheme baseColor="#2a2a2a" highlightColor="#3a3a3a">
      <div className="card-skeleton">
        <Skeleton height={150} width={100} className="card-skeleton__image" />
        <div className="card-skeleton__content">
          <Skeleton height={20} width="70%" className="card-skeleton__title" />
          <Skeleton height={14} width="40%" className="card-skeleton__date" />
          <Skeleton height={12} count={2} className="card-skeleton__description" />
          <Skeleton height={24} width={80} className="card-skeleton__rating" />
        </div>
      </div>
    </SkeletonTheme>
  );
};
