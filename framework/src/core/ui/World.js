import 'src/core/ui/WebComponent.js';

namespace `core.ui` (
    class World extends core.ui.Application {
        constructor(el) {
            super(el);
        }

        onUpdate(accumilated, delta){}

        onFixedUpdate(){}

        onDraw(interpolation){}

        onUpdateEnd(fps, panic){
            if (panic) {
                var discardedTime = Math.round(MainLoop.resetFrameDelta());
            }
        }

        getSimulationTimestep(){ return 1000/60 }
    }
);
window.World = window.World||core.ui.World;