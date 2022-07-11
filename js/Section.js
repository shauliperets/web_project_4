export class Section {
  constructor({ items, renderer }, selector) {
    this._items = items;
    this._renderer = renderer;
    this._selector = document.querySelector(selector);
  }

  renderer() {
    this._items.forEach((item, index) => {
      item.id = index;
      this._renderer(item);
    });
  }

  setItem(element) {
    this._container.append(element);
  }
}
