import { GoBackLink } from "@/components/GoBackLink";
import { NewContainer } from "@/forms/NewContainer";

export default function NewContainerPage() {
    return (
        <section>

            {/* <GoBackLink href={"/new"} /> */}

            <br />
            
            <h2>New Container.</h2>

            <br />

            <NewContainer />

        </section>
    )
}