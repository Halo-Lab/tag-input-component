import './style.scss';
import { el } from "./utils/dom";

import TagInput from './components/TagInput';

customElements.define('tag-input', TagInput);

const tagInput = document.createElement('tag-input') as TagInput;
document.body.append(tagInput);
tagInput.append(el('option', { value: 'option1' }, 'Film and Animation'));
tagInput.append(el('option', { value: 'option2' }, 'Autos and Vehicles'));
tagInput.append(el('option', { value: 'option3' }, 'Music'));
tagInput.append(el('option', { value: 'option1' }, 'Pets & Animals'));
tagInput.append(el('option', { value: 'option2' }, 'Sports'));
tagInput.append(el('option', { value: 'option3' }, 'Travel and Events'));
tagInput.append(el('option', { value: 'option1' }, 'Gaming'));
tagInput.append(el('option', { value: 'option2' }, 'People and Blogs'));
tagInput.append(el('option', { value: 'option3' }, 'Comedy'));
tagInput.append(el('option', { value: 'option1' }, 'Entertainment'));
tagInput.append(el('option', { value: 'option2' }, 'News and Politics'));
tagInput.append(el('option', { value: 'option3' }, 'How-to and Style'));
tagInput.append(el('option', { value: 'option3' }, 'Education'));
tagInput.append(el('option', { value: 'option1' }, 'Science and Technology'));
tagInput.append(el('option', { value: 'option2' }, 'Nonprofits and Activism'));
tagInput.append(el('option', { value: 'option3' }, 'Epic Breaking Bad Memes'));
console.log(tagInput.options);

console.log(tagInput.value);