import styled from "styled-components";
import Typo from "../Typo/Typo";
import { SystemColor } from "configs/styles/colors";
import { IUserMeta } from "configs/interfaces/common/user-meta.interface";
import { HTMLAttributes } from "react";
import { Tooltip } from "antd";

interface IProfileBadgeProps {
  user: IUserMeta;
  size?: "medium" | "large";
  idx?: number;
}

export function ProfileBadge({ user, idx, size }: IProfileBadgeProps) {
  return (
    <Tooltip
      title={
        <>
          <Typo fontSize="0.75rem" color="white">
            {user.name}
          </Typo>
          <Typo fontSize="0.65rem" color="white">
            {user.email}
          </Typo>
        </>
      }
      placement="bottom"
    >
      <RoundBadge className="profile-badge" background={getBadgeColor(idx)}>
        <Typo fontSize="0.9rem" color="white">
          {user.name ? user.name[0] : user.email[0]}
        </Typo>
      </RoundBadge>
    </Tooltip>
  );
}

interface IProfileBadgesProps extends HTMLAttributes<HTMLDivElement> {
  users: IUserMeta[];
}

export function ProfileBadges({ users, ...rest }: IProfileBadgesProps) {
  return (
    <BadgeGroup {...rest}>
      {users.map((user, idx) => (
        <ProfileBadge key={user._id} user={user} idx={idx} />
      ))}
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
