import LoginComponent from "../components/LoginComponent";
const Login = (props) => {
  var tipo = props.location.state ? props.location.state.tipo : "";
  return (
    <div className="loginDiv">
      <LoginComponent type={tipo}> </LoginComponent>
    </div>
  );
};
export default Login;
