import { useEffect, useState } from "react";
import { useUser } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const { email, logout, getProfile } = useUser();
  const [profile, setProfile] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      const profileData = await getProfile();
      if (profileData) {
        setProfile(profileData);
      }
    };
    fetchProfile();
  }, [getProfile]);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="container my-5">
      <h1>Perfil</h1>
      {profile ? (
        <div>
          <p>Correo electrónico: {email}</p>
        </div>
      ) : (
        <p>Cargando perfil...</p>
      )}
      <button className="btn btn-danger" onClick={handleLogout}>
        Cerrar sesión
      </button>
    </div>
  );
};

export default ProfilePage;