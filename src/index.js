import './index.scss'
import { TextField } from './components/TextField/TextField'
import { DropDown } from './components/DropDown/DropDown'
import { MaskedTextFieldInit } from './components/MaskedTextField/MaskedTextField'
import { DatePickerRangeInit, DatePickerFilterInit } from './components/DatePicker/DatePicker';

TextField('[data-active="active"]')

new DropDown('.dropdown', {
  placeholder:'Удобства',
  label:'Dropdown',
  items:['спальни', 'кровати', 'ванные комнаты'],
})

MaskedTextFieldInit()
DatePickerRangeInit('.datepicker-range')
DatePickerFilterInit('.datepicker-filter')