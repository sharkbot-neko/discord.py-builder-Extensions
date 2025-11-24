function generateBlocklyCategory(labelText, color) {
    const toolsboxs = document.getElementById('toolbox');
    if (!toolsboxs) return;

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

function generateBlocklySeparator() {
    const toolsboxs = document.getElementById('toolbox');
    if (!toolsboxs) return;
    const sp = document.createElement('sep');

    toolsboxs.appendChild(sp);
}

window.onload = function() {
    generateBlocklySeparator();

    // 音楽など(VC)
    const music = generateBlocklyCategory('VC', '#ff0a0a');
    if (music) {
        generateBlocklyBlcok(music, "mp3から音楽を再生", "vc_play");
        generateBlocklyBlcok(music, "youtubeから音楽を再生", "vc_youtube");
        generateBlocklyBlcok(music, "音楽を停止", "vc_stop");
    }


    // DMに送信
    const dm = generateBlocklyCategory('DM', '#07d3b1');
    if (dm) {
        generateBlocklyBlcok(dm, "実行者のDMに送信", "dm_send_runner");
    }

    // 招待リンクなど
    const invite = generateBlocklyCategory('招待', '#0f4980');
    if (invite) {
        generateBlocklyBlcok(invite, "招待リンクを作成", "invite_create");
    }

    generateBlocklySeparator();

    // 定番コマンド
    const templates = generateBlocklyCategory('定番コマンド', '#533939');
    if (templates) {
        generateBlocklyBlcok(templates, "Pingコマンドを追加", "pingcommand_add");
    }
    
    chrome.runtime.sendMessage({ action: "injectBlocklyBlock" });
};