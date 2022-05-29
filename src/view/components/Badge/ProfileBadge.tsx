import styled from "styled-components";
import Typo from "../Typo/Typo";
import { IUserMeta } from "configs/interfaces/common/user-meta.interface";
import { HTMLAttributes } from "react";
import { Tooltip } from "antd";

interface IProfileBadgeProps {
  user: Omit<IUserMeta, "_id">;
  size?: "medium" | "large";
  bordered?: boolean;
  pointer?: boolean;
}

export function ProfileBadge({ user, size }: IProfileBadgeProps) {
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
      <RoundProfileBadge user={user} size={size} />
    </Tooltip>
  );
}

export function RoundProfileBadge({
  user,
  size,
  bordered,
  pointer,
}: IProfileBadgeProps) {
  return (
    <RoundBadge
      className="profile-badge"
      size={size}
      background={
        user.emoji ? undefined : getPastelColorByString(user.name || user.email)
      }
      bordered={bordered}
      pointer={pointer}
    >
      <Typo
        fontSize={
          size === "large" ? "1.6rem" : user.emoji ? "1.35rem" : "0.8rem"
        }
        color="white"
      >
        {user.emoji || (user.name ? user.name[0] : user.email[0])}
      </Typo>
    </RoundBadge>
  );
}

interface IProfileBadgesProps extends HTMLAttributes<HTMLDivElement> {
  users: IUserMeta[];
  overflowCount?: number;
}

export function ProfileBadges({
  users,
  overflowCount = 2,
  ...rest
}: IProfileBadgesProps) {
  const profiles = [...users].reverse();
  return (
    <BadgeGroupContainer {...rest}>
      <BadgeGroup>
        {profiles.slice(-overflowCount).map((user) => (
          <ProfileBadge key={user._id} user={user} />
        ))}
      </BadgeGroup>
      {users.length > overflowCount && (
        <Typo className="overflow-count" fontSize="0.7rem" color="#888">
          +{users.length - overflowCount}
        </Typo>
      )}
    </BadgeGroupContainer>
  );
}

const BadgeGroupContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2px;
  .overflow-count {
    letter-spacing: -1px;
  }
`;

const BadgeGroup = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row-reverse;
  margin-right: 7px;
  .profile-badge {
    position: relative;
    margin-right: -7px;
  }
`;

const RoundBadge = styled.div<{
  size?: "medium" | "large";
  background?: string;
  bordered?: boolean;
  pointer?: boolean;
}>`
  user-select: none;
  width: 22px;
  height: 22px;
  border-radius: 100%;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  ${(props) => props.size === "large" && `width: 48px; height: 48px;`}
  ${(props) => props.background && `background: ${props.background};`}
  ${(props) =>
    props.bordered &&
    `
  box-shadow: 0px 0px 2px 2px rgba(74, 74, 74, 0.174);`}
  ${(props) => props.pointer && `cursor: pointer;`}
`;

function getPastelColorByString(str: string): string {
  const baseRed = 128;
  const baseGreen = 128;
  const baseBlue = 128;

  let seed = str.charCodeAt(0);
  const rand_1 = Math.abs(Math.sin(seed++) * 10000) % 256;
  const rand_2 = Math.abs(Math.sin(seed++) * 10000) % 256;
  const rand_3 = Math.abs(Math.sin(seed++) * 10000) % 256;

  const r = Math.round((rand_1 + baseRed) / 2);
  const g = Math.round((rand_2 + baseGreen) / 2);
  const b = Math.round((rand_3 + baseBlue) / 2);

  return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}
