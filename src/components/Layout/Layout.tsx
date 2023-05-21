import { FC } from "react";
import styles from "./Layout.module.css";
import { ILayoutProps } from "./Layout.props";


const Layout: FC<ILayoutProps> = ({ children }) => {
  return (
    <div className={styles.container}>
      {children}
    </div>
  );
};

export default Layout