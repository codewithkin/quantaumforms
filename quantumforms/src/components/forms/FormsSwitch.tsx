import { Form } from "@prisma/client"

function FormsSwitch({forms, view}: {forms: Form[], view: string}) {
  return (
    <article className="py-4">
        {
            forms.map((form: Form) => {
                const { createdAt, title, description, id, updatedAt, userId, settingsId, primaryColor, secondaryColor, logo, shareableLink } = form;

                return view === "table" ?
                (
                    <h2>Table here</h2>
                ) :
                view === "list" ?
                <h2>List</h2> :
                <h2>Card</h2>
            })
        }
    </article>
  )
}

export default FormsSwitch
