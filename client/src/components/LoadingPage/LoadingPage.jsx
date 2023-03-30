import React from 'react';
import { Spin } from 'antd';
import styles from "./LoadingPage.module.css"

function LoadingPage() {
  return (
    <div className={styles.centertxt}>
      <Spin size="large" />
      <p>LOADING</p>
    </div>
  );
}

export default LoadingPage;