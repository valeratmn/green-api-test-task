import { useState, useEffect, useRef } from "react";
import axios from "axios";
import styles from './Auth.module.css';
import { authActions } from "../../store";
import { useAppDispatch } from "../../store/hooks";


const Auth: React.FC = () => {
  const [id, setId] = useState<string>(""); // idInstance
  const [apiToken, setToken] = useState<string>(""); // apiTokenInstance
  const [status, setStatus] = useState<string>(""); // состояние авторизации аккаунта
  const dispatch = useAppDispatch();
  const idRef = useRef<HTMLInputElement>(null);
  
  // установит фокус при рендере формы в поле ввода idInstance
  useEffect(() => {
    if (idRef.current) idRef.current.focus()
  }, [])

  // отправляет введеный id и token для авторизации. возвращает состояние авторизации аккаунта
  const fetchLogin = async (id: string, token: string) => {
    const response = await axios.get(
      `https://api.green-api.com/waInstance${id}/getStateInstance/${token}`
    );
    setStatus(response.data.stateInstance);
  };

  const submitHandler = (event: React.FormEvent<EventTarget>) => {
    event.preventDefault();
    fetchLogin(id, apiToken);
  };

  // отправит в store ввденные id и token и полученое из fetchLogin состояние авторизации
  useEffect(
    () => {
      dispatch(authActions.loggedIn({ id, apiToken, status }));
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [status]
  );
  
  let buttonDisabled: boolean = id.length > 1 && apiToken.length > 1;

  return (
    <form action="submit" onSubmit={submitHandler} className={styles.form}>
      <label htmlFor="id">ID</label>
      <input
        type="text"
        value={id}
        onChange={(e) => setId(e.target.value)}
        placeholder="IdInstance"
        ref={idRef}
      />
      <label htmlFor="token">API Token</label>
      <input
        value={apiToken}
        onChange={(e) => setToken(e.target.value)}
        placeholder="ApiTokenInstance"
      />
      <button disabled={!buttonDisabled} type="submit">
        Login
      </button>
    </form>
  );
};

export default Auth;
