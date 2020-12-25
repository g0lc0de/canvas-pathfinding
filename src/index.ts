import { Controller } from "./controller";
import { AStarPathfinder } from "./pathfinder";
import { Tile } from "./tile";
import { TileField } from "./tilefield";

class Startup {
  public static main(): void {
    const canvas = <HTMLCanvasElement>document.getElementById("canvas");
    const ctx = canvas.getContext("2d");
    if (canvas == null || ctx == null) {
      console.log("Canvas not found.");
      return;
    }

    const height = (document.defaultView?.innerHeight ?? 100) - 25; // 25 offset
    const width = (document.defaultView?.innerWidth ?? 100) - 25; // 25 offset

    const field = new TileField(canvas, ctx, width, height, 13);
    field.init();

    const controller = new Controller(field);
    if (controller.pathfinder instanceof AStarPathfinder) {
      const params = new URLSearchParams(location.search);
      if (params.has("delay")) {
        controller.pathfinder.delay = parseInt(params.get("delay") ?? "50");
      }
    }

    //field.on("enter", (tile: Tile) => {
    //  tile.updateRandomColor(ctx);
    //  console.log("+", tile);
    //});
//
    //field.on("leave", (tile: Tile) => {
    //  tile.draw(ctx);
    //  console.log("-", tile);
    //});
//
    //field.on("mousedown", (event: MouseEvent) => {
    //  const tile = field.getTileAbsolute(event.clientX, event.clientY);
    //  if (tile != null) {
    //    tile.updateRandomColor(ctx);
    //  }
    //});
  }
}

Startup.main();
