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
    // 音楽など(VC)
    const music = generateBlocklyCategory('VC', '#ff0a0a');
    generateBlocklyBlcok(music, "音楽を再生", "vc_play");
    generateBlocklyBlcok(music, "音楽を停止", "vc_stop");

    // DMに送信
    const dm = generateBlocklyCategory('DM', '#07d3b1');
    generateBlocklyBlcok(dm, "実行者のDMに送信", "dm_send_runner");

    // 定番コマンド
    const templates = generateBlocklyCategory('定番コマンド', '#533939');
    generateBlocklyBlcok(templates, "Pingコマンドを追加", "pingcommand_add");

    chrome.runtime.sendMessage({ action: "injectBlocklyBlock" });
};