async function ProfileContent() {
  const response = await fetch("/api/profile");
  const data = await response.json();

  return (
    <div>
      <h1>{data.name}</h1>
    </div>
  );
}

export default ProfileContent;
