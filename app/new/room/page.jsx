import { GoBackLink } from "@/components/GoBackLink";
import { NewPlace } from "@/forms/NewPlace";

export default function NewContainerPage() {
    return (
        <section>

            {/* <GoBackLink href={"/new"} /> */}

            <br />

            <h2>New Room.</h2>

            <br />

            <NewPlace />

        </section>
    )
}