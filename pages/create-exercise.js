import Head from "next/head"
import Layout from "../components/layout"
import CreateExerciseForm from "../components/create-exercise-form"

export default function CreateExercise() {
    return (
        <Layout>
            <Head></Head>
            <section className="form">
                <CreateExerciseForm />
            </section>
        </Layout>
    )
}