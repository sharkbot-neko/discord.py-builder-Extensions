function addBlock() {
    if (typeof window.Blockly === 'undefined' || typeof window.Blockly.Blocks === 'undefined') {
        console.warn("Blockly オブジェクトが見つかりません。");
        return;
    }

    window.Blockly.Blocks['test_now'] = {
        init: function() {
            this.appendDummyInput().appendField("テストなう"); this.setPreviousStatement(true, null); this.setNextStatement(true, null); this.setColour(160);
        }
    };

    window.Blockly.Python['test_now'] = function(block) {
        const code = 'print("テストなう！")';
        return code; 
    };

    window.Blockly.Blocks['vc_play'] = {
        init: function() {
            this.appendDummyInput().appendField("音楽を再生"); this.setPreviousStatement(true, null); this.setNextStatement(true, null); this.setColour(160);
            this.appendValueInput("MP3_PATH").setCheck("String").appendField("mp3のpath");
        }
    };

    window.Blockly.Python['vc_play'] = function(block) {
        const code = `voice_client = ctx.guild.voice_client\nif voice_client is None:\n return\naudio_source = discord.FFmpegPCMAudio(source=${Blockly.Python.valueToCode(block, 'MP3_PATH', Blockly.Python.ORDER_NONE)})\nif not voice_client.is_playing():\nvoice_client.play(audio_source)`;
        return code;
    };

    console.log("Custom Blockly block 'test_now' injected successfully.");
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "injectBlocklyBlock" && sender.tab && sender.tab.id) {
        
        chrome.scripting.executeScript({
            target: { tabId: sender.tab.id },
            function: addBlock,
            world: "MAIN"
        })
        .then(() => console.log("Auto-injection of Blockly script succeeded."))
        .catch(error => console.error("Auto-injection failed:", error));

        return true; 
    }
});