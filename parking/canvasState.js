// canvasState.js
export const canvasState = {
    planes: [],
    addPlane(plane) {
        this.planes.push(plane);
        this.logState();
    },
    updatePlane(planeId, data) {
        const plane = this.planes.find(p => p.id === planeId);
        if (plane) {
            Object.assign(plane, data);
        }
        this.logState();
    },
    removePlane(planeId) {
        this.planes = this.planes.filter(plane => plane.id !== planeId);
        this.logState();
    },
    clear() {
        this.planes = [];
        this.logState();
    },
    logState() {
        console.log("Current canvas state:");
        this.planes.forEach(plane => {
            console.log(`ID: ${plane.id}, Apron: ${plane.parkingApron}, Spot: ${plane.parkingSpot}, Type: ${plane.planeType}, Color: ${plane.color}, Tag: ${plane.showTag}, Tag Data: ${plane.tagData}`);
        });
    }
};
