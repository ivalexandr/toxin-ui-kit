import Inputmask from 'inputmask'

const MaskedTextFieldInit = () => {
  Inputmask("99.99.9999",{ 
  "placeholder": "ДД.ММ.ГГГГ",
})
  .mask('.masked-text-field__input')
}

export { MaskedTextFieldInit }