export function Loader() {
    const tr = document.createElement('tr');
    const td = document.createElement('td');
    td.setAttribute("colspan", "6");
    const loader = document.createElement('span');
    loader.classList.add('loader');
    td.append(loader);
    tr.append(td);

    return tr
}