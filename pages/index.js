import Head from 'next/head'
import Layout from '../components/layout'

import ExercisesList from '../components/exercises-list'

export default function Home() {
  return (
    <Layout home>
      <Head>
        <title>Home page</title>
      </Head>
      <section className="table">
        <ExercisesList />
      </section>
    </Layout>
  )
}
