import { Button } from "@material-ui/core";
import "./Login.css";
import { auth, provider } from "../firebase";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";

export default function Login() {
  const login = () => {
    auth.signInWithRedirect(provider);
  };

  return (
    <div className="app">
      <div className="login">
        <div className="login__container">
          <WhatsAppIcon fontSize="large" />
          <div className="login__text">
            <h1>Sign in to WhatsApp</h1>
          </div>
          <Button onClick={login}>Sign in with Google</Button>
        </div>
      </div>
    </div>
  );
}
