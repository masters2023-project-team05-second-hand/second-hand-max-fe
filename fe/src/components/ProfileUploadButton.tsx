import { ReactComponent as CameraIcon } from "@assets/icon/camera.svg";
import { ErrorMessage } from "@styles/common";
import { useMutation } from "@tanstack/react-query";
import { postUserProfile } from "api";
import { useState } from "react";
import { useMember } from "store";
import styled from "styled-components";

export default function ProfileUploadButton() {
  const [member, setMember] = useMember();
  const [errorMessage, setErrorMessage] = useState<string>("");

  const userProfileMutation = useMutation(postUserProfile);

  const onChangeProfileImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      userProfileMutation.mutate(file, {
        onSuccess: (res) => {
          const newProfileImageUrl = res.data.profileImgUrl;
          setMember({
            ...member,
            profileImgUrl: newProfileImageUrl,
          });
        },
        onError: () => {
          setErrorMessage(
            "프로필 이미지 업로드에 실패했습니다. 잠시 후 다시 시도해주세요."
          );
        },
      });
    }
  };

  return (
    <StyledProfile>
      <ProfileUpload htmlFor="profile-upload-input">
        {member?.profileImgUrl && <ProfileImage src={member?.profileImgUrl} />}
        <CameraIcon className="camera-icon" />
        <input
          type="file"
          id="profile-upload-input"
          onChange={onChangeProfileImage}
        />
      </ProfileUpload>
      {errorMessage && (
        <ErrorMessage className="error-message">{errorMessage}</ErrorMessage>
      )}
    </StyledProfile>
  );
}

// TODO: Toast 메시지로 변경
const StyledProfile = styled.div`
  display: flex;
  position: relative;
  width: 100px;
  height: 100px;

  .error-message {
    position: absolute;
    width: 300px;
    bottom: -50vh;
    left: -100px;
  }
`;

const ProfileUpload = styled.label`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border-radius: ${({ theme: { radius } }) => radius.half};
  background-color: ${({ theme: { color } }) => color.neutralOverlay};
  border: 1px solid ${({ theme: { color } }) => color.neutralBorder};

  .camera-icon {
    filter: ${({ theme: { filter } }) => filter.accentText};
  }

  #profile-upload-input {
    display: none;
  }
`;

const ProfileImage = styled.img`
  width: 100%;
  height: 100%;
  position: absolute;
  object-fit: cover;
  cursor: pointer;
  border-radius: 50%;
  border: 1px solid ${({ theme }) => theme.color.neutralBorder};
  filter: brightness(0.8);
`;
