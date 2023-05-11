import {Person} from "./Person";

export class Article
{
  id?: number
  title?: string
  type?: string
  journal?: string
  date?: Date
  firstPage?: number
  lastPage?: string
  editor?: string;
  description?: string;
  url?: string
  authors?: Person[]
  //DOI?: string;
}
