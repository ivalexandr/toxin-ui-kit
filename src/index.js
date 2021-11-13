import './index.scss'
import { TextField } from './components/TextField/TextField'
import { DropDown } from './components/DropDown/DropDown'


TextField('[data-active="active"]')

const drop = new DropDown('.dropdown', {
  placeholder:'Удобства',
  label:'Dropdown',
  items:['спальни', 'кровати', 'ванные комнаты'],
})
