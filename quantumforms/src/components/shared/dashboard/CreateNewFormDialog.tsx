import { Button } from "@/components/ui/button"
import { Dialog, DialogTrigger, DialogHeader, DialogTitle, DialogContent, DialogDescription, DialogFooter } from "@/components/ui/dialog"

function CreateNewFormDialog() {
  return (
    <Dialog>
        <DialogTrigger>
            <Button variant="default" color="primary" className="bg-gradient-to-r from-purple-500 to-pink-500 hover:scale-105 w-full md:w-fit">
            Create New Form
            </Button>
        </DialogTrigger>

        <DialogContent>
            <DialogHeader>
                <DialogTitle>
                    Create a new form
                </DialogTitle>
                <DialogDescription>
                    Need a new form ? I'm here to help !
                </DialogDescription>
            </DialogHeader>

            <DialogFooter>

            </DialogFooter>
        </DialogContent>
    </Dialog>
  )
}

export default CreateNewFormDialog
