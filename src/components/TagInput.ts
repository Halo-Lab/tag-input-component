import { el, replaceDom } from "../utils/dom";
import styleText from './TagInput.scss?inline';
const sheet = new CSSStyleSheet();
sheet.replaceSync(styleText);

type TagInputOption = {
    id: string;
    name: string;
}

class TagInput extends HTMLElement {

    #value: Set<string> = new Set();

    elemRoot?: HTMLDivElement;
    elemItems?: HTMLDivElement;
    elemOptionDialog?: HTMLDivElement;
    elemOptionItems?: HTMLDivElement;

    searchString = '';

    constructor () {
        super();
        const shadow = this.attachShadow({ mode: 'open' });
        shadow.adoptedStyleSheets = [sheet];
        this._render();
    }

    get value () {
        return Array.from(this.#value);
    }

    get options (): TagInputOption [] {
        // transform a list of inner "option" html elements into an array
        const options: TagInputOption[] = [];
        Array.from(this.children).forEach(child => {
            if (child.tagName === 'OPTION') {
                const option = child as HTMLOptionElement;
                options.push({
                    id: option.value,
                    name: option.innerText,
                });
            }
        });
        return options;
    }

    addItem (option: TagInputOption|string) {
        this.#value.add(typeof option === 'string' 
            ? option 
            : option.name
        );
        this._renderItems();
        this._renderOptions();
    }

    removeItem (option: TagInputOption|string) {
        this.#value.delete(typeof option === 'string' 
        ? option 
        : option.name);
        this._renderItems();
        this._renderOptions();
    }

    toggleItem (option: TagInputOption|string, add?: boolean) {
        if (add === undefined) add = !this.options.find(o => o.name === option || o === option);
        if (add) this.addItem(option);
        else this.removeItem(option);
    }

    clearItems () {
        this.#value.clear();
        this._renderItems();
        this._renderOptions();
    }


    private get _filteredOptions () {
        const options = this.options;

        // filter items by search, if typed something
        const searchFiltered = this.searchString
            ? options.filter(option => option.name.toLowerCase().includes(this.searchString.toLowerCase()))
            : options;
        
        // filter items by whether they are already selected
        const valueFiltered = searchFiltered.filter(option => !this.value.includes(option.name));

        // for creating custom items
        if (this.searchString && !options.find(option => option.name === this.searchString))
            valueFiltered.unshift({
                id: '__custom__',
                name: this.searchString,
            });

        return valueFiltered;
    }



    private _renderItems () {
        replaceDom(this.elemItems!, ...this._htmlItems());
    }

    private _renderOptions () {
        replaceDom(this.elemOptionItems!, ...this._htmlOptionItems());
    }

    private _render () {

        this.elemItems = el('div', { className: 'tagInputItems' }, this._htmlItems()) as HTMLDivElement;
        this.elemOptionItems = el('div', { className: 'tagInputOptionItems' }, this._htmlOptionItems()) as HTMLDivElement;
        this.elemOptionDialog = el('div', { className: 'tagInputOptions' }, this._htmlOptionDialog()) as HTMLDivElement;

        this.elemRoot = el('div', { className: 'tagInputWrapper' }, [
            this.elemItems,
            this.elemOptionDialog,
            ...this._htmlActionButtons(),
        ]) as HTMLDivElement;

        replaceDom(this.shadowRoot!, this.elemRoot);

    }

    private _htmlItems = () => this.value.map(value => 
        el('button', {
            className: 'tagInputChip',
            onclick: () => this.removeItem(value),
        }, value)
    );

    private _htmlActionButtons = () => [
        // clear button
        el('button', { 
            className: 'tagInputButton',
            onclick: () => this.clearItems(),
        }, '🗑️'),

        // toggle add dialog button
        el('button', { 
            className: 'tagInputButton',
            onclick: () => {
                this.elemOptionDialog?.classList.toggle('vis');
                this._renderOptions();
            },
        }, '+'),
    ];

    private _htmlOptionDialog = () => [
        el('div', { className: 'tagInputOptionItem' }, [
            el('input', { 
                type: 'text', 
                placeholder: 'Type here...',
                oninput: (e: InputEvent) => {
                    const target = e.target as HTMLInputElement;
                    this.searchString = target.value.trim();
                    this._renderOptions();
                }
            }),
        ]),
        this.elemOptionItems,
    ];

    private _htmlOptionItems = () => this._filteredOptions.map(option =>
        el('button', { 
            className: 'tagInputOptionItem',
            onclick: () => this.addItem(option),
        }, [
            el('span', {}, 
                option.id === '__custom__'
                    ? `Create "${option.name}"`
                    : option.name
            ),
        ]),
    );

}

export default TagInput;