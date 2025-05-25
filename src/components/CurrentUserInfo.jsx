import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const CurrentUserInfo = ({ showAvatar = true, imgSize = 40 }) => {
  const { userName, avatar_url, greeting } = useContext(AuthContext);
  if (!userName) return null;

  return (
    <div className="flex flex-col items-center gap-4 my-7">
      {showAvatar && (
        <img
          src={avatar_url}
          alt="User Avatar"
          width={imgSize}
          height={imgSize}
          className="rounded-full object-cover"
        />
      )}
      <h1 className="md:text-7xl text-4xl text-center text-black ">
        <span className="inline-block hand-wave">👋</span> {greeting}, {userName.toUpperCase()}!
      </h1>
    </div>
  );
};
export default CurrentUserInfo;