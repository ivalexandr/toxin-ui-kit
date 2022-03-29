import './index.scss'
import { TextField } from './components/TextField/TextField'
import { DropDown } from './components/DropDown/DropDown'
import { MaskedTextFieldInit } from './components/MaskedTextField/MaskedTextField'
import { DatePickerRangeInit, DatePickerFilterInit } from './components/DatePicker/DatePicker';
import { LikeButton } from './components/LikeButton/LikeButton'

TextField('[data-active="active"]')
new DropDown('.dropdown', {
  placeholder:'Удобства',
  label:'Dropdown',
  items:['спальни', 'кровати', 'ванные комнаты'],
})
MaskedTextFieldInit()
DatePickerRangeInit('.datepicker-range')
DatePickerFilterInit('.datepicker-filter')

const like_1 = new LikeButton('.like-btn-1')
like_1.counterValue = 2
const like_2 = new LikeButton('.like-btn-2')
like_2.counterValue = 11
like_2.addActive()