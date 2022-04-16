import { IUser } from "configs/interfaces/common/user.interface";
import styled from "styled-components";
import Typo from "../Typo/Typo";
import Tooltip from "react-tooltip";
import { SystemColor } from "configs/styles/colors";

interface IProfileBadgeProps {
  user: IUser;
  size?: "medium" | "large";
  idx?: number;
}

export function ProfileBadge({ user, idx }: IProfileBadgeProps) {
  return (
    <RoundBadge
      data-tip={`${user.name}<br />${user.email}`}
      className="profile-badge"
      background={getBadgeColor(idx)}
    >
      <Typo fontSize="0.9rem" color="white">
        {user.name ? user.name[0] : user.email[0]}
      </Typo>
    </RoundBadge>
  );
}

interface IProfileBadgesProps {
  users: IUser[];
}

export function ProfileBadges({ users }: IProfileBadgesProps) {
  return (
    <BadgeGroup>
      {users.map((user, idx) => (
        <ProfileBadge key={user._id} user={user} idx={idx} />
      ))}
      <Tooltip effect="solid" place="bottom" multiline />
    </BadgeGroup>
  );
}

const BadgeGroup = styled.div`
  display: flex;
  .profile-badge:not(:first-child) {
    margin-left: -6px;
  }
`;

const RoundBadge = styled.div<{
  size?: "medium" | "large";
  background?: string;
}>`
  user-select: none;
  width: 24px;
  height: 24px;
  border-radius: 100%;
  background: ${(props) => props.background || SystemColor.Grey50};
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  ${(props) =>
    props.size && props.size === "large" && `width: 32px; height: 32px;`}
`;

const badgeColors = [
  SystemColor.Iris60,
  SystemColor.Fuschia80,
  SystemColor.Blue50,
  SystemColor.Green30,
];
function getBadgeColor(idx?: number) {
  if (idx !== 0 && !idx) {
    return SystemColor.Grey50;
  }
  return badgeColors[idx % badgeColors.length];
}
