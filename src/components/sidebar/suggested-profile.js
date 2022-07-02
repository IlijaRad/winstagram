import { useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import {
  updateLoggedInUserFollowing,
  updateFollowedUserFollowers,
} from "../../services/firebase";
import { DEFAULT_IMAGE_PATH } from "../../constants/paths";

export default function SuggestedProfile({
  profileDocId,
  username,
  profileId,
  userId,
  loggedInUserDocId,
}) {
  const [followed, setFollowed] = useState(false);

  async function handleFollowUser() {
    setFollowed(true);
    await updateLoggedInUserFollowing(loggedInUserDocId, userId, false);
    await updateFollowedUserFollowers(profileDocId, profileId, false);
  }
  return !followed ? (
    <div className="align-items flex flex-row items-center justify-between">
      <div className="flex items-center justify-between">
        <img
          className="mr-3 flex w-8 rounded-full"
          src={`/images/avatars/${username}.jpg`}
          onError={(e) => {
            e.target.src = DEFAULT_IMAGE_PATH;
          }}
          alt=""
        />
        <Link to={`/p/${username}`}>
          <p className="text-sm font-bold">{username}</p>
        </Link>
      </div>
      <button
        className="text-xs font-bold text-lightBlue-primary"
        type="button"
        onClick={handleFollowUser}
      >
        Follow
      </button>
    </div>
  ) : null;
}

SuggestedProfile.propTypes = {
  profileDocId: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  profileId: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
  loggedInUserDocId: PropTypes.string.isRequired,
};
