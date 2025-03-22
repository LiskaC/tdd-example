import { FC } from 'react'
import { Jokes } from './sections'
import styles from './page.module.css'

const Page: FC = () => (
  <div className={styles.page}>
    <h1>Get your Bad Dad Jokes here</h1>
    <Jokes />
  </div>
)

export default Page