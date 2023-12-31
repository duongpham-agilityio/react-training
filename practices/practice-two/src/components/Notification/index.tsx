// Components
import { Heading, Button } from 'components/commons';

// Styles
import styles from 'components/Notification/index.module.css';

// Assets
import CloseIcon from 'assets/icons/x-letter.svg';

type Type = 'success' | 'warning' | 'error' | 'info';
export type NotificationProps = {
  title: string;
  message: string;
  type?: Type;
};

const Notification = (props: NotificationProps) => {
  const { title, message, type = 'success' } = props;

  return (
    <section
      className={`${styles.notification} ${styles[type]} ${styles.sideIn}`}
    >
      <div className={styles.content}>
        <Heading label={title} />
        <p className={styles.message} data-testid="notify-message">
          {message}
        </p>
      </div>
      <Button leftIcon={CloseIcon} className={styles.icon} />
    </section>
  );
};

export default Notification;
