const TextField = (selector) => {
  const $el = document.querySelector(selector)
  const $input = $el.querySelector('input')
  $input.style.outline = 'none'
  $input.style.border = '1px solid rgba(31, 32, 65, 0.5)'
}
export { TextField }