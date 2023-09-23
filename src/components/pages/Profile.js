export default function Profile({ user }) {
  return (
    <div>
      <h2>EMAIL : {user.email}</h2>
      <h2>PSEUDO : {user.username}</h2>
    </div>
  );
}
