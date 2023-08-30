import ProfileUploadButton from "./ProfileUploadButton";

export default function UserAccount() {
  // TODO: 상태관리 라이브러리 사용
  const member: { nickname: string; profileImgUrl: string } = JSON.parse(
    localStorage.getItem("member") || "{}"
  );

  return (
    <>
      <ProfileUploadButton profileUrl={member.profileImgUrl} />
      <span>{member.nickname}</span>
    </>
  );
}
