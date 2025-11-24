function addBlock() {
    if (typeof window.Blockly === 'undefined' || typeof window.Blockly.Blocks === 'undefined') {
        console.warn("Blockly オブジェクトが見つかりません。");
        return;
    }

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

    window.Blockly.Blocks['vc_stop'] = {
        init: function() {
            this.appendDummyInput().appendField("音楽を停止"); this.setPreviousStatement(true, null); this.setNextStatement(true, null); this.setColour(160);
        }
    };

    window.Blockly.Python['vc_stop'] = function(block) {
        const code = `voice_client = ctx.guild.voice_client\nif voice_client is None:\n    return\nvoice_client.stop()`;
        return code;
    };

    window.Blockly.Blocks['dm_send_runner'] = {
        init: function() {
            this.appendDummyInput().appendField("実行者のDMに送信"); this.setPreviousStatement(true, null); this.setNextStatement(true, null); this.setColour(160);
            this.appendValueInput("MESSAGE").setCheck("String").appendField("メッセージ内容");
        }
    };

    window.Blockly.Python['dm_send_runner'] = function(block) {
        const code = `await ctx.author.send(${Blockly.Python.valueToCode(block, 'MESSAGE', Blockly.Python.ORDER_NONE)})`;
        return code;
    };

    window.Blockly.Blocks['pingcommand_add'] = {
        init: function() {
            this.appendDummyInput().appendField("Pingコマンドを追加"); this.setPreviousStatement(true, null); this.setNextStatement(true, null); this.setColour(160);
        }
    };

    window.Blockly.Python['pingcommand_add'] = function(block) {
        const code = `@commands.command(name="ping")\nasync def ping_command(self, ctx: commands.Context):\n    await ctx.reply('Pong! {round(self.bot.latency * 1000)}ms')`;
        return code;
    };
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