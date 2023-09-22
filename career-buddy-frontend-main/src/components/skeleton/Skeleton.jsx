import SkeletonStyles from "./skeleton.module.scss";

const Skeleton = ({
  width = "10rem",
  height = "10rem",
  borderRadius = "0",
  backgroundColor = "#eee",
  className,
  style,
}) => {
  return (
    <div
      style={{ width, height, borderRadius, backgroundColor }}
      className={SkeletonStyles.skeleton}
    ></div>
  );
};

export default Skeleton;
