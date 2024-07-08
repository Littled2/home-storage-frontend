import { GoBackLink } from "@/components/GoBackLink";
import { NewItem } from "@/forms/NewItem";

export default function NewItemPage({ searchParams }) {
    return (
        <section>

            <GoBackLink href={"/"} />

            <br />
            
            <h2>New Item</h2>

            <br />

            <NewItem place={searchParams?.place} />

        </section>
    )
}