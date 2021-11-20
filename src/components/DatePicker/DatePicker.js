import AirDatepicker from 'air-datepicker';
import localeRu from 'air-datepicker/locale/ru'

const DatePickerRangeInit = (selector) => {
  let dpMin, dpMax
  const button = {
    content: 'применить',
    className: 'custom-button-classname',
    onClick: (dp) => {
        dp.hide()
    }
}
  dpMin = new AirDatepicker(`${selector} [data-picker="datapickerFrom"]`,{
    locale:localeRu,
    onSelect({date}) {
      dpMax.update({
          minDate: date
      })
  },
  navTitles:{
    days:'MMMM <i>yyyy</i>'
  },
  buttons:['clear', button]
})
  dpMax = new AirDatepicker(`${selector} [data-picker="datapickerTo"]`,{
    locale:localeRu,
    onSelect({date}) {
      dpMin.update({
          maxDate: date
      })
  },
  navTitles:{
    days:'MMMM <i>yyyy</i>'
  },
  buttons:['clear', button]
})
}

const DatePickerFilterInit = (selector) => {
  return new AirDatepicker(`${selector} [data-picker="datepicker-filter"]`, {
    range: true,
    multipleDatesSeparator:' - ',
    dateFormat(date){
      return date.toLocaleString('ru', {
        day:'numeric',
        month:'short'
      })
    }
  })
}

export { DatePickerRangeInit, DatePickerFilterInit }