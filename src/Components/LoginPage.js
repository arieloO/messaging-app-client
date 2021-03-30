import { useHistory } from "react-router-dom";

const LoginPage = ({ username, setUsername }) => {
  // useHistory
  let history = useHistory();

  // handle onSubmit
  const handleSubmit = (e) => {
    e.preventDefault();
    // if username is valid
    if (e.target[0].value) {
      // check if valid
      // if (e.target[0].value.lenght < 20) {
      // setUsername
      setUsername(e.target[0].value);
      history.push("/chatroom");
      // }
    }
  };

  // BLOCK IF EMPTY USERNAME

  return (
    <div className="login-page">
      <h1>enter username</h1>
      <div id="form-wrapper">
        <form id="login-form" onSubmit={handleSubmit}>
          <div id="username-input">
            <input type="text" placeholder="Amanda...? ...Chuckles !?"></input>
          </div>
          <div id="submit-button">
            <button type="submit">submit</button>
          </div>
        </form>
        <div id="login-notes">
          <h4>Welcome !</h4>
          <p>
            This chatroom is <b>not private</b> ! <br /> Beware not to share any
            personal information or private data.
            </p>
            <hr />
            <p>
            - Respect the laws of your country.
            <br />
            - Don't be a crap.
            <br />
            - Avoid beeing creepy.
            <br />- And, if anything goes wrong, please let mothers out of it.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
