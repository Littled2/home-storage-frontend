import { GoBackLink } from "@/components/GoBackLink";
import { NewLocation } from "@/forms/NewLocation";

export default function NewContainerPage() {
    return (
        <section>

            {/* <GoBackLink href={"/new"} /> */}

            <br />

            <h2>New Location.</h2>

            <br />

            <NewLocation />

        </section>
    )
}