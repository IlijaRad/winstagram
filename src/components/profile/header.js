import { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import Skeleton from "react-loading-skeleton";
import useUser from "../../hooks/use-user";
import { isUserFollowingProfile, toggleFollow } from "../../services/firebase";
import UserContext from "../../context/user";
import { DEFAULT_IMAGE_PATH } from "../../constants/paths";

export default function Header({
  photosCount,
  followerCount = 0,
  setFollowerCount,
  profile: {
    docId: profileDocId,
    userId: profileUserId,
    fullName,
    followers,
    following,
    username: profileUsername,
  },
}) {
  const { user: loggedInUser } = useContext(UserContext);
  const { user } = useUser(loggedInUser?.uid);
  const [isFollowingProfile, setIsFollowingProfile] = useState(null);
  const activeBtnFollow = user?.username && user?.username !== profileUsername;

  const handleToggleFollow = async () => {
    setIsFollowingProfile((isFollowingProfile) => !isFollowingProfile);
    setFollowerCount({
      followerCount: isFollowingProfile ? followerCount - 1 : followerCount + 1,
    });
    await toggleFollow(
      isFollowingProfile,
      user.docId,
      profileDocId,
      profileUserId,
      user.userId
    );
  };

  useEffect(() => {
    const isLoggedInUserFollowingProfile = async () => {
      const isFollowing = await isUserFollowingProfile(
        user.username,
        profileUserId
      );
      setIsFollowingProfile(!!isFollowing);
    };

    if (user?.username && profileUserId) {
      isLoggedInUserFollowingProfile();
    }
  }, [user?.username, profileUserId]);

  return (
    <>
      <div className="mb-8 flex max-w-full px-5 pt-[30px] sm:mx-4 md:mx-0 md:mb-12 md:max-w-screen-lg">
        <div className="mr-4 flex shrink items-center md:mr-[30px] md:basis-[30%] md:justify-center">
          {profileUsername ? (
            <img
              className="flex h-[77px] min-h-[77px] w-[77px] min-w-[77px] rounded-full md:h-40 md:w-40"
              alt={`${fullName} profile`}
              src={`/images/avatars/${profileUsername}.jpg`}
              onError={(e) => {
                e.target.src = DEFAULT_IMAGE_PATH;
              }}
            />
          ) : (
            <Skeleton circle height={150} width={150} count={1} />
          )}
        </div>
        <div className="flex flex-col items-center justify-center md:basis-[70%]">
          <div className="container flex items-center">
            <p className="-mt-1 mr-2 max-w-[150px] truncate text-xl sm:mr-4 sm:max-w-[300px] md:max-w-[350px] md:text-2xl">
              {profileUsername}
            </p>
            {activeBtnFollow && isFollowingProfile === null ? (
              <Skeleton count={1} width={80} height={32} />
            ) : (
              activeBtnFollow && (
                <button
                  className="w-[92px] rounded bg-lightBlue-primary py-0.5 text-sm font-bold leading-8 text-white"
                  type="button"
                  onClick={handleToggleFollow}
                  onKeyDown={(event) => {
                    if (event.key === "Enter") {
                      handleToggleFollow();
                    }
                  }}
                >
                  {isFollowingProfile ? "Unfollow" : "Follow"}
                </button>
              )
            )}
          </div>
          <div className="container mt-4 hidden md:flex">
            {!followers || !following ? (
              <Skeleton count={1} width={677} height={24} />
            ) : (
              <>
                <p className="mr-10">
                  <span className="font-bold">{photosCount}</span> photos
                </p>
                <p className="mr-10">
                  <span className="font-bold">{followerCount}</span>
                  {` `}
                  {followerCount === 1 ? `follower` : `followers`}
                </p>
                <p className="mr-10">
                  <span className="font-bold">{following?.length}</span>{" "}
                  following
                </p>
              </>
            )}
          </div>
          <div className="container mt-4 hidden md:block">
            <p className="font-medium">
              {!fullName ? <Skeleton count={1} height={24} /> : fullName}
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-col md:hidden">
        <p className="truncate px-9 font-medium">
          {!fullName ? <Skeleton count={1} height={24} /> : fullName}
        </p>
        <div className="mt-8 flex w-full items-center justify-around border-t border-gray-primary py-2 text-sm text-[#262626]">
          <div className="flex flex-col items-center justify-center">
            <div className="font-semibold">{photosCount}</div>
            <div className="text-[#8e8e8e]">posts</div>
          </div>
          <div className="flex flex-col items-center justify-center">
            <div className="font-semibold">{followerCount}</div>
            <div className="text-[#8e8e8e]">followers</div>
          </div>
          <div className="flex flex-col items-center justify-center">
            <div className="font-semibold">{following?.length}</div>
            <div className="text-[#8e8e8e]">following</div>
          </div>
        </div>
      </div>
    </>
  );
}

Header.propTypes = {
  photosCount: PropTypes.number.isRequired,
  followerCount: PropTypes.number,
  setFollowerCount: PropTypes.func.isRequired,
  profile: PropTypes.shape({
    docId: PropTypes.string,
    userId: PropTypes.string,
    fullName: PropTypes.string,
    username: PropTypes.string,
    followers: PropTypes.array,
    following: PropTypes.array,
  }).isRequired,
};
