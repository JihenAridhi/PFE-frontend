import {Autorisation} from "./Autorisation";

export class Person
{
  id?: number
  firstName?: string
  lastName?: string
  email?: string
  password?: string
  profession?: string
  team?: string
  interest?: string
  photo?: string
  status?: boolean
  autorisations?: Autorisation[]
}
