import { ReactNode } from 'react';
import styles from './styles.module.css';

interface BlogPostListContainerProps {
  children: ReactNode | ReactNode[];
}

export default function BlogPostListContainer(props: BlogPostListContainerProps) {
  const { children } = props;

  return (
    <div className={styles.container}>
      {children}
    </div>
  );
}
