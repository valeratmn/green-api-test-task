import { useState } from "react";
import { chatIdActions } from "../../store";
import styles from "./NewChat.module.css";
import { useAppSelector, useAppDispatch } from "../../store/hooks";

const NewChat: React.FC = () => {
  const [phoneNumber, setPhoneNumber] = useState<string>(""); // введеный номер телефона
  const [showInput, setShowInput] = useState<boolean>(false); // состояние отображения поля ввода номера телефона
  const authStatus = useAppSelector((state) => state.auth.status);
  const dispatch = useAppDispatch();

  // преобразовывает введеный номер телефона в валидный chatId и отправляет в store
  const submitHandler = (event: React.FormEvent<EventTarget>): void => {
    event.preventDefault();
    const chatId = phoneNumber.concat("@c.us");
    dispatch(chatIdActions.setChatId(chatId));
    setPhoneNumber('')
  };

  // тогглит поле ввода номера
  const showInputHandler = () => {
    setShowInput((showInput) => !showInput);
  };

  const buttonDisabled = phoneNumber.trim().length < 10;

  return (
    <div className={styles.newChat}>
      {showInput && (
        <form action="submit" onSubmit={submitHandler}>
          <input
            type="number"
            placeholder={
              authStatus === "authorized"
                ? "Input phone number"
                : "You need to authorize an account"
            }
            value={phoneNumber}
            onChange={(e) => {
              setPhoneNumber(e.target.value);
            }}
          />
          {authStatus === "authorized" && (
            <button type="submit" disabled={buttonDisabled}>
              Start Chat
            </button>
          )}
        </form>
      )}
      <button className={styles.newChat} onClick={showInputHandler}>
        {showInput ? "Cancel" : "New Chat"}
      </button>
    </div>
  );
};

export default NewChat;
