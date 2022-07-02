import PropTypes from "prop-types";

export default function Image({ src, caption }) {
  return (
    <img
      className="aspect-[1/1.4] h-full max-h-[600px] w-full object-cover"
      src={src}
      alt={caption}
    />
  );
}

Image.propTypes = {
  src: PropTypes.string.isRequired,
  caption: PropTypes.string.isRequired,
};
