import { revalidatePath } from 'next/cache'
import type { CollectionAfterChangeHook, GlobalAfterChangeHook } from 'payload'

export const revalidateProperty: CollectionAfterChangeHook = ({ doc }) => {
  revalidatePath(`/property/${doc.slug}`)
  revalidatePath('/')
}

export const revalidateAreaGuide: CollectionAfterChangeHook = () => {
  revalidatePath('/area-guide')
  revalidatePath('/')
}

export const revalidatePage: CollectionAfterChangeHook = ({ doc }) => {
  revalidatePath(`/${doc.slug}`)
}

export const revalidateSiteSettings: GlobalAfterChangeHook = () => {
  revalidatePath('/', 'layout')
}
