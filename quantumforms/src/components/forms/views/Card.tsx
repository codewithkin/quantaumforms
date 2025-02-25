import { Button } from '@/components/ui/button';
import { Form } from '@/types'
import { Pencil } from 'lucide-react';
import Link from 'next/link';
import {motion} from "framer-motion";
import CardsViewMoreOptions from './CardsViewMoreOptions';

function FormCards({forms}: {forms: Form[]}) {
  return (
    <article className="grid md:grid-cols-4 sm:grid-cols-2 items-center md:gap-8 gap-4">
        {
            forms && forms.length > 0 &&
            forms.map((form: Form, index: number) => {
                const {id, title, createdAt, shareableLink} = form;
                return (
                    <motion.article 
                    initial={{

                        opacity: 0,
                        x: 200
                      }}
      
                      animate={{
                        opacity: 1,
                        x: 1
                      }}
      
                      transition={{
                        delay: index * 0.1
                      }}
                    key={id} className={`hover:cursor-pointer grid min-h-[400px] p-4 rounded-xl text-white bg-gradient-to-tr from-orange-300 to-purple-600 w-full`}>
                        <article>
                            <h3 className='text-xl font-semibold'>{title}</h3>
                            <p className='font-semibold'>{createdAt}</p>
                            <p className='px-4 py-1 rounded-full bg-purple-800 w-fit text-sm'>{form.responses.length} Responses</p>
                        </article>
                        
                        {/* Controls */}
                        <article className="flex flex-col gap-2 w-full justify-self-end self-end">
                            <Button className='w-full' asChild>
                                <Link className="flex items-center gap-2" href={`/user/forms/${shareableLink}`}>
                                    <Pencil size={16} />
                                    <span>Edit</span>
                                </Link>
                            </Button>
                            <CardsViewMoreOptions form={form} />
                        </article>
                    </motion.article>
                )
            })
        }
    </article>
  )
}

export default FormCards
