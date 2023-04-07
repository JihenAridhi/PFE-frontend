import {Person} from "./Person";

export class Article
{
  id?: number
  title?: string
  type?: string
  date?: Date
  firstPage?: number
  lastPage?: number
  editor?: string
  authors?: Person[]
}
