function generateBlocklyCategory(labelText, color) {
    const toolsboxs = document.getElementById('toolbox');
    const category = document.createElement('category');
    category.setAttribute('colour', color);
    category.setAttribute('name', labelText)

    toolsboxs.appendChild(category);
    return category;
}

function generateBlocklyBlcok(category, labelText, type) {
    const block = document.createElement('block');
    block.setAttribute('type', type);
    block.textContent = labelText;
    category.appendChild(block);
}

window.onload = function() {
    const test = generateBlocklyCategory('テストなう', '#000000');
    generateBlocklyBlcok(test, "テストですねぇ", "test_now");
    generateBlocklyBlcok(test, "音楽を再生", "vc_play");

    chrome.runtime.sendMessage({ action: "injectBlocklyBlock" });
};