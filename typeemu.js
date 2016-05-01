var Cpu = (function () {
    function Cpu() {
    }
    Cpu.prototype.RunFromCurrentPosition = function (cycles) {
    };
    Cpu.ClockSpeed = 4190000;
    return Cpu;
}());
var GameBoy = (function () {
    function GameBoy() {
        this.lastFrameTimeStamp = 0;
    }
    GameBoy.prototype.RunEmulation = function () {
        this.cpu = new Cpu();
        this.RunFrame(0);
    };
    GameBoy.prototype.RunFrame = function (timeStamp) {
        var _this = this;
        if (this.lastFrameTimeStamp === 0) {
            if (timeStamp != null)
                this.lastFrameTimeStamp = timeStamp;
            window.requestAnimationFrame(function (timeStamp) { _this.RunFrame(timeStamp); });
            return;
        }
        var frameLength = timeStamp - this.lastFrameTimeStamp;
        var cycles = (frameLength / 1000) * Cpu.ClockSpeed;
        this.cpu.RunFromCurrentPosition(cycles);
        this.lastFrameTimeStamp = timeStamp;
        window.requestAnimationFrame(function (timeStamp) { _this.RunFrame(timeStamp); });
    };
    return GameBoy;
}());
new GameBoy().RunEmulation();
//# sourceMappingURL=typeemu.js.map