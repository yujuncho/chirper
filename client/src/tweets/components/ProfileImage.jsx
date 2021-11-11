import styled from "styled-components";

import colors from "../../shared/data/colors";

const ProfileImageContainer = styled.div`
  width: 48px;
  height: 48px;
  background: ${colors.LIGHT_OPAQUE};
  border-radius: 50%;
  margin-right: 1rem;
`;

export default function ProfileImage() {
  return <ProfileImageContainer />;
}
