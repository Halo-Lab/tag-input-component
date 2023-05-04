export const el = (name: string, props?: Record<string, any>, children?: any[]|string) => {
    const elem = document.createElement(name);
    if (props) {
        for (const [key, value] of Object.entries(props)) {
            if (key === 'style') {
                Object.assign(elem.style, value);
            } else if (key === 'className') {
                elem.className = value;
            } else if (key === 'classList') {
                elem.classList.add(...value);
            } else if (key.startsWith('on')) {
                elem.addEventListener(key.slice(2), value);
            } else {
                elem.setAttribute(key, value);
            }
        }
    }
    if (children) {
        if (typeof children === 'string') elem.innerText = children;
        else elem.append(...children);
    }
    return elem;
}

export const replaceDom = (parentElem: HTMLElement|ShadowRoot, ...children: HTMLElement[]) => {
    parentElem.innerHTML = '';
    parentElem.append(...children);
}