function printRules() {
    let popupShown = false;

    const prefix = '.icon-lsi-';
    const cleanPrefix = 'icon-lsi-';
    const parent = document.getElementById("rules");
    const searchInput = document.getElementById("search");
    const popup = document.getElementById("popup");
    const popupBack = document.getElementById("popup-back");
    const previewIcon = document.getElementById("preview-icon");
    const previewText = document.getElementById("preview-text");
    const previewCode = document.getElementById("preview-code");


    searchInput.addEventListener('keyup', () => runSearch());
    popupBack.addEventListener('click', () => hidePopup());
    document.addEventListener('keyup', (e) => {
        if (popupShown && e.code == 'Escape') {
            hidePopup();
        }
    })

    hidePopup();


    const rules = document.styleSheets[0].rules || document.styleSheets[0].cssRules;
    let values = [];
    for (let x = 0; x < rules.length; x++) {
        values.push(rules[x].selectorText);
    }

    values = values.filter(x => x && x.indexOf(prefix) === 0).map(s => s.slice(prefix.length, s.length - 8)).sort();

    const elements = [];
    for (let x = 0; x < values.length; x++) {
        const el = document.createElement('li');
        el.className = "flex-item";
        el.innerHTML = '<i class="' + cleanPrefix + values[x] + '"></i><span>' + values[x] + '</span>';
        el.addEventListener('click', () => showPopup(values[x]));

        parent.appendChild(el);
        elements.push(el);
    }


    function showPopup(x) {
        previewText.innerHTML = cleanPrefix + x;
        previewIcon.className = cleanPrefix + x;
        previewCode.innerHTML = cleanPrefix + x;
        popupShown = true;
        popupBack.style.display = 'block';
        popup.style.display = 'block';
    }

    function hidePopup() {
        popupShown = false;
        popupBack.style.display = 'none';
        popup.style.display = 'none';
    }


    function runSearch(e) {
        const searchValue = searchInput.value;
        values.forEach((val, index) => {
            if (searchValue && val.indexOf(searchValue) === -1) {
                elements[index].style.display = 'none';
            } else {
                elements[index].style.display = 'block';
            }
        });
    }

}



printRules();