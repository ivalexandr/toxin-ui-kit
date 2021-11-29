
class LikeButton{
  constructor(selector){
    this.$el = document.querySelector(selector)
    this.#addCounter()
    this.#init()
  }
  #clickHandler(e){
    const btn = this.$el.querySelector('.like-button')
    btn.classList.toggle('like-button--active')
    if(btn.classList.contains('like-button--active')){
      ++this.counterValue
      this.#addCounter()
    }
    if(!btn.classList.contains('like-button--active')){
      --this.counterValue
      this.#addCounter()
    }
  }
  #init(){
    this.$el.addEventListener('click', this.#clickHandler.bind(this))
  }
  #addCounter(){
    this.$el.querySelector('.like-button__counter').textContent = this.counterValue
  }
  addActive(){
    this.$el.querySelector('.like-button').classList.add('like-button--active')
    ++this.counterValue
      this.#addCounter()
  }
  removeActive(){
    this.$el.querySelector('.like-button').classList.remove('like-button--active')
    --this.counterValue
      this.#addCounter()
  }
  remove(){
    this.$el.removeEventListener(this.#clickHandler.bind(this))
    this.$el.remove()
  }
  get counterValue(){
    return this._counter
  }
  set counterValue(counter){
    this._counter = counter
    this.#addCounter()
  }
}

export { LikeButton }