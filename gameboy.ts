/**
 * Represents the device as a whole (CPU, display, memory, etc.).  Also contains
 * high-level logic that ties each component of the system together
 */
class GameBoy
{
    private cpu: Cpu;
    private lastFrameTimeStamp = 0;
    
    /** Initializes the system and begins emulation */
    public RunEmulation()
    {
        this.cpu = new Cpu();
        this.RunFrame(0);
    }
    
    /**
     * Tells the CPU to execute a number of cycles dependent on when we can
     * draw the next frame to the canvas.
     * @param timeStamp The current time as returned by Performance.now()
     */
    private RunFrame(timeStamp: number)
    {
        if (this.lastFrameTimeStamp === 0)
		{
			if (timeStamp != null)
				this.lastFrameTimeStamp = timeStamp;
				
			window.requestAnimationFrame((timeStamp: number) => { this.RunFrame(timeStamp); });
			return;
		}
		
		var frameLength = timeStamp - this.lastFrameTimeStamp;
		var cycles = (frameLength / 1000) * Cpu.ClockSpeed;
		
		this.cpu.RunFromCurrentPosition(cycles);
        
		this.lastFrameTimeStamp = timeStamp;
		window.requestAnimationFrame((timeStamp: number) => { this.RunFrame(timeStamp); });
    }
}

new GameBoy().RunEmulation();