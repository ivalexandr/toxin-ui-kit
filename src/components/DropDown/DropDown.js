class DropDown {
  constructor(selector, options) {
    this.$el = document.querySelector(selector)
    this.options = options
    this.arrayCounters = options.items.map(item => ({ name: item, counter: 0 }))
    this.init()
  }
  #cropText(text) {
    if (text.length >= 20) return text.slice(0, 20) + '...'
    return text
  }
  #createElement(element, className) {
    const $el = document.createElement(element)
    if (className) {
      $el.classList.add(className)
    }
    return $el
  }
  #markupDropDownList() {
    const $dropdownList = this.#createElement('div', 'dropdown__list')
    this.arrayCounters.forEach(item => {
      $dropdownList.insertAdjacentHTML(
        'beforeend',
        `
      <div class = "dropdown__item">
        <span class = "dropdown__itemtext">${item.name}</span>
        <span class = "dropdown__pagination">
          <span class="dropdown__minus dropdown__minus--diactive" data-click = "${item.name}"></span>
          <span class="dropdown__counter">${item.counter}</span>
          <span class = "dropdown__plus" data-click = "${item.name}"></span>
        </span>
      </div>
    `
      )
    })
    return $dropdownList
  }
  #markupMenuGuests() {
    const $menuGuests = this.#createElement('div', 'dropdown__menu')
    $menuGuests.insertAdjacentHTML(
      'beforeend',
      `
      <a href="#" class = "dropdown__clear dropdown__clear--diactive">очистить</a>
      <a href="#" class = "dropdown__save">применить</a>
    `
    )
    return $menuGuests
  }
  #markupDropDown() {
    const $mainDrop = this.#createElement('div', 'dropdown__main')
    const $labelDrop = this.#createElement('div', 'dropdown__label')
    const $textFieldDrop = this.#createElement('div', 'dropdown__textfield')
    const $textDrop = this.#createElement('span', 'dropdown__text')
    const $arrowDrop = this.#createElement('span', 'dropdown__arrow')

    $textDrop.textContent = this.options.placeholder
    $labelDrop.textContent = this.options.label
    this.$el.append($mainDrop)
    $mainDrop.append($labelDrop)
    $mainDrop.append($textFieldDrop)
    $mainDrop.append(this.#markupDropDownList())
    $textFieldDrop.append($textDrop)
    $textFieldDrop.append($arrowDrop)
    if (this.options.guests)
      this.$el.querySelector('.dropdown__list').append(this.#markupMenuGuests())
  }
  #markupCounters(array) {
    if (!this.options.guests) {
      return array.map(item => `${item.counter} ${item.name}`).join(', ')
    }
    const allCounterGuests = array.reduce((total, item) => {
      return (total += item.counter)
    }, 0)

    if (allCounterGuests > 0) {
      this.$el.querySelector('.dropdown__clear').classList.remove('dropdown__clear--diactive')
    } else {
      this.$el.querySelector('.dropdown__clear').classList.add('dropdown__clear--diactive')
    }

    if (allCounterGuests === 0) return `${allCounterGuests} гостей`
    if (allCounterGuests === 1) return `${allCounterGuests} гость`
    if (allCounterGuests > 1 && allCounterGuests < 5)
      return `${allCounterGuests} гостя`
    if (allCounterGuests >= 5) return `${allCounterGuests} гостей`
  }
  #clickHandler(e) {
    const targetList = e.target.classList
    const $textDrop = this.$el.querySelector('.dropdown__text')

    e.stopPropagation()
    e.preventDefault()

    if (
      targetList.contains('dropdown__textfield') ||
      targetList.contains('dropdown__text') ||
      targetList.contains('dropdown__arrow')
    ) {
      this.$el
        .querySelector('.dropdown__list')
        .classList.toggle('dropdown__list--active')
      this.$el
        .querySelector('.dropdown__textfield')
        .classList.toggle('dropdown__textfield--active')
    }
    if (targetList.contains('dropdown__plus')) {
      const arrayCounters = this.$el.querySelectorAll('.dropdown__counter')
      const arrayMinuses = this.$el.querySelectorAll('.dropdown__minus')

      this.arrayCounters.map((item, index, array) => {
        if (item.name === e.target.dataset.click) {
          item.counter++
        }
        $textDrop.textContent = this.#cropText(this.#markupCounters(array))
        arrayCounters[index].textContent = item.counter
        if (item.counter > 0) {
          arrayMinuses[index].classList.remove('dropdown__minus--diactive')
        }
        return item
      })
    }
    if (targetList.contains('dropdown__minus')) {
      const arrayCounters = this.$el.querySelectorAll('.dropdown__counter')
      const arrayMinuses = this.$el.querySelectorAll('.dropdown__minus')
      this.arrayCounters.map((item, index, array) => {
        if (item.name === e.target.dataset.click) {
          if (item.counter === 0) {
            item.counter = 0
          } else {
            item.counter--
          }
        }

        $textDrop.textContent = this.#cropText(this.#markupCounters(array))
        arrayCounters[index].textContent = item.counter

        if (item.counter === 0) {
          arrayMinuses[index].classList.add('dropdown__minus--diactive')
        }
        return item
      })
    }
    if (targetList.contains('dropdown__clear')) {
      this.arrayCounters = this.options.items.map(item => ({
        name: item,
        counter: 0
      }))
      this.$el
        .querySelectorAll('.dropdown__counter')
        .forEach(item => (item.textContent = '0'))
      this.$el
        .querySelectorAll('.dropdown__minus')
        .forEach(item => item.classList.add('dropdown__minus--diactive'))
      $textDrop.textContent = this.options.placeholder
      e.target.classList.add('dropdown__clear--diactive')
    }
    if (targetList.contains('dropdown__save')) {
      this.close()
    }
  }
  #clickCloseDropHanlder() {
    this.$el
      .querySelector('.dropdown__list')
      .classList.remove('dropdown__list--active')
    this.$el
      .querySelector('.dropdown__textfield')
      .classList.remove('dropdown__textfield--active')
  }
  init() {
    this.#markupDropDown()
    this.$el
      .closest('body')
      .addEventListener('click', this.#clickCloseDropHanlder.bind(this))
    this.$el.addEventListener('click', this.#clickHandler.bind(this))
  }
  remove() {
    this.$el.removeEventListener('click', this.#clickHandler.bind(this))
    this.$el.removeEventListener(
      'click',
      this.#clickCloseDropHanlder.bind(this)
    )
    this.$el.remove()
  }
  open() {
    this.$el
      .querySelector('.dropdown__list')
      .classList.add('dropdown__list--active')
    this.$el
      .querySelector('.dropdown__textfield')
      .classList.add('dropdown__textfield--active')
  }
  close() {
    this.$el
      .querySelector('.dropdown__list')
      .classList.remove('dropdown__list--active')
    this.$el
      .querySelector('.dropdown__textfield')
      .classList.remove('dropdown__textfield--active')
  }
  get data() {
    return this.arrayCounters
  }
}

export { DropDown }
